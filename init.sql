drop database if exists PeriferiaSocial;

create database PeriferiaSocial;

CREATE TABLE Roles(
    id SERIAL PRIMARY KEY,
    name varchar(250)  NOT NULL,
    created timestamp default current_timestamp,
    updated timestamp default current_timestamp
);

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name varchar(250) NOT NULL,
    lastname varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    email varchar(250) UNIQUE NOT NULL,
    alias varchar(20) NOT NULL,
    role_id int NOT NULL,
    created timestamp default current_timestamp,
    updated timestamp default current_timestamp
);

ALTER TABLE Users ADD CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES Roles(id);

INSERT INTO Roles(name)
VALUES('EMPLOYEE'),
      ('CUSTOMER'),
      ('ADMIN');

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  text_content TEXT NULL,
  source TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

CREATE TABLE post_likes (
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id BIGINT NULL REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

CREATE TABLE post_media (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image' | 'video'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_post_media_post_id ON post_media(post_id);

CREATE TABLE follows (
  follower_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id <> following_id)
);