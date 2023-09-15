--УДАЛЯЕМ ТАБЛИЦЫ
DROP TABLE IF EXISTS blog CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS ingredient CASCADE;
DROP TABLE IF EXISTS persondata CASCADE;
DROP TABLE IF EXISTS phrase CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS tagconnection CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;


--СОЗДАЁМ ТАБЛИЦЫ
-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(64) NOT NULL,
    role integer NOT NULL,
    isactivated boolean NOT NULL DEFAULT false,
    activationlink text,
    PRIMARY KEY (id),
    CONSTRAINT "login_UNIQUE_Error" UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.category
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    caption character varying(255) NOT NULL,
    photopreview character varying,
    bg character varying,
    caption_lat character varying,
    PRIMARY KEY (id),
    CONSTRAINT "Category_UNIQUE_Error" UNIQUE (caption_lat)
);

CREATE TABLE IF NOT EXISTS public.phrase
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    caption character varying NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "Phrase_UNIQUE_Error" UNIQUE (caption)
);

CREATE TABLE IF NOT EXISTS public.blog
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    dateadd date NOT NULL,
    caption character varying(255) NOT NULL,
    caption_lat character varying NOT NULL,
    photoorig text,
    photopreview text,
    description text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "Blog_UNIQUE_Error" UNIQUE (caption_lat)
);

CREATE TABLE IF NOT EXISTS public.recipe
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    dateadd character varying NOT NULL,
    caption character varying(255) NOT NULL,
    caption_lat character varying NOT NULL,
    photoorig text,
    photopreview text,
    shortdescription text,
    cookingtext text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "Recipe_UNIQUE_Error" UNIQUE (caption_lat)
);

CREATE TABLE IF NOT EXISTS public.ingredient
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer NOT NULL,
    caption character varying(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "Ingredient_UNIQUE_Error" UNIQUE (caption)
);

CREATE TABLE IF NOT EXISTS public.persondata
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    name character varying(255),
    avatar character varying,
    PRIMARY KEY (id),
    CONSTRAINT "PersonData_UNIQUE_Error" UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.token
(
    id serial NOT NULL,
    user_id integer,
    refreshtoken text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.tag
(
    id serial NOT NULL,
    tagname character varying(255),
    PRIMARY KEY (id),
    CONSTRAINT "Tag(tagname)_UNIQUE_Error" UNIQUE (tagname)
);

CREATE TABLE IF NOT EXISTS public.tagconnection
(
    id serial NOT NULL,
    tag_id integer NOT NULL,
    blog_id integer,
    recipe_id integer,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    id serial NOT NULL,
    role character varying NOT NULL,
    roledescription character varying,
    PRIMARY KEY (roledescription),
    CONSTRAINT "Roles_UNIQUE(role)_Error" UNIQUE (role),
    CONSTRAINT "Roles_UNIQUE(id)_Error" UNIQUE (id),
    CONSTRAINT "Roles_UNIQUE(roledescription)_Error" UNIQUE (roledescription)
);

ALTER TABLE IF EXISTS public.users
    ADD FOREIGN KEY (role)
    REFERENCES public.roles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.category
    ADD CONSTRAINT "Category_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.phrase
    ADD CONSTRAINT "Phrase_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.blog
    ADD CONSTRAINT "Blog_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.recipe
    ADD CONSTRAINT "Recipe(user_id)_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.recipe
    ADD CONSTRAINT "Recipe(category_id)_FK_Error" FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.ingredient
    ADD CONSTRAINT "Ingredient(user_id)_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.ingredient
    ADD CONSTRAINT "Ingredient(recipe_id)_FK_Error" FOREIGN KEY (recipe_id)
    REFERENCES public.recipe (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.persondata
    ADD CONSTRAINT "PersonData_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.token
    ADD CONSTRAINT "Token(user_id)_FK_Error" FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE IF EXISTS public.tagconnection
    ADD CONSTRAINT "Tagconnection(tag_id)_FK_Error" FOREIGN KEY (tag_id)
    REFERENCES public.tag (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.tagconnection
    ADD CONSTRAINT "Tagconnection(blog_id)_FK_Error" FOREIGN KEY (blog_id)
    REFERENCES public.blog (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.tagconnection
    ADD CONSTRAINT "Tagconnection(recipe_id)_FK_Error" FOREIGN KEY (recipe_id)
    REFERENCES public.recipe (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;

--ЗАПОЛНЯЕМ ТАБЛИЦЫ
INSERT INTO public.roles (id, role, roledescription) VALUES (1, 'admin', 'Администратор');
INSERT INTO public.roles (id, role, roledescription) VALUES (2, 'user', 'Пользователь');
----------------
INSERT INTO public.users (id, email, password, role, isactivated, activationlink) VALUES (1, 'admin@lexun.ru', '$2b$04$jsNI.JKIeaG3ezPfCtY1U.OEZkaJliE3j3wrUKXu1SojtiS6.zN3W', 1, true, '');
----------------
INSERT INTO public.persondata (id, user_id, name, avatar) VALUES (1, 1, 'CRASH', NULL);
----------------
