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
INSERT INTO public.users (id, email, password, role, isactivated, activationlink) VALUES (2, 'checkout@lexun.ru', '$2b$04$oSiOyjbN7wdxg/XgiXppJewKk5OsWLPCZIxu0C12O5Dr8zzQTtedm', 1, true, '');
INSERT INTO public.users (id, email, password, role, isactivated, activationlink) VALUES (1, 'admin@lexun.ru', '$2b$04$jsNI.JKIeaG3ezPfCtY1U.OEZkaJliE3j3wrUKXu1SojtiS6.zN3W', 1, true, '');
INSERT INTO public.users (id, email, password, role, isactivated, activationlink) VALUES (3, 'qqq@lexun.ru', '$2b$04$lRSHTd0fTOImuC2qOJMNEuaTt5nBo/11QYR8tRf.ixSf7RkUsP8vy', 2, true, '');
----------------
INSERT INTO public.token (id, user_id, refreshtoken) VALUES (2, 2, '');
INSERT INTO public.token (id, user_id, refreshtoken) VALUES (3, 3, '');
INSERT INTO public.token (id, user_id, refreshtoken) VALUES (1, 1, '');
----------------
INSERT INTO public.persondata (id, user_id, name, avatar) VALUES (2, 2, 'LENA', 'users/checkout@lexun.ru/833.jpg');
INSERT INTO public.persondata (id, user_id, name, avatar) VALUES (3, 3, 'QQQ', 'users/qqq@lexun.ru/109726.jpg');
INSERT INTO public.persondata (id, user_id, name, avatar) VALUES (1, 1, 'CRASH', 'users/admin@lexun.ru/719.jpg');
----------------
INSERT INTO public.blog (id, user_id, dateadd, caption, caption_lat, photoorig, photopreview, description) VALUES (1, 1, TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Яблоко', 'yabloko', '/blogs/yabloko/photo.jpg', '/blogs/yabloko/photo.jpg', 'Я́блоко — сочный плод яблони, который употребляется в пищу в свежем и запеченном виде, служит сырьём в кулинарии и для приготовления напитков. Наибольшее распространение получила яблоня домашняя, реже выращивают яблоню сливолистную. Размер красных, зелёных, жёлтых или оранжевых шаровидных плодов 5—13 см в диаметре. Происходит из Центральной Азии, где до сих пор произрастает дикорастущий предок яблони домашней — яблоня Сиверса. На сегодняшний день существует множество сортов этого вида яблони, произрастающих в различных климатических условиях. По времени созревания отличают летние, осенние и зимние сорта, более поздние сорта отличаются хорошей стойкостью.');
INSERT INTO public.blog (id, user_id, dateadd, caption, caption_lat, photoorig, photopreview, description) VALUES (2, 1, TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Окрошка', 'okroshka', '/blogs/okroshka/photo.jpg', '/blogs/okroshka/photo.jpg', 'Традиционный холодный суп русской кухни, который готовят в весенне-летний период. Обязательными компонентами Традиционный холодный суп русской кухни, который готовят в весенне-летний период. Обязательными компонентами  компонентами  русской окрошки являются хлебный (ржаной, ячменный) квас, свежие огурцы, укроп, растёртый с солью зелёный лук, столовая горчица, крутое яйцо и сметана. Ингредиенты окрошки измельчают, крошат, что отражено в названии супа. В переносном смысле слово «окрошка» употребляется в значении «смесь, смешение разнородных понятий и предметов» окрошки являются хлебный (ржаной, ячменный) квас, свежие огурцы, укроп, растёртый с солью зелёный лук, столовая горчица, крутое яйцо и сметана. Ингредиенты окрошки измельчают, крошат, что отражено в названии супа. В переносном смысле слово «окрошка» употребляется в значении «смесь, смешение разнородных понятий и предметов»');
INSERT INTO public.blog (id, user_id, dateadd, caption, caption_lat, photoorig, photopreview, description) VALUES (4, 1, TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Щи', 'schi', '/blogs/schi/photo.jpg', '/blogs/schi/photo.jpg', 'Щи — классическое национальное блюдо русской кухни, многокомпонентный заправочный суп, основу которого составляет рубленая белокочанная свежая или квашеная капуста, реже капустная рассада или савойская капуста, приготовляемый на костном или мясокостном или рыбном бульоне, грибном, овощном или крупяном отваре. Щи бывают вегетарианскими грибными, а также мясными, с птицей и рыбными. Помимо капусты в зависимости от рецепта в щи добавляют картофель, крупы, свежие помидоры и яблоки. Щи традиционно сервируют с пирожками, ватрушками, кулебякой, гречневой кашей или крупеником, для забелки подают сметану. Наряду с борщом очень распространённое и популярное в русской кухне первое горячее блюдо.

Короткое слово «щи», редкое для русского языка, не имеет общепризнанной этимологии. Согласно этимологическому словарю М. Фасмера, слово «щи» и его более древняя, ныне диалектальная форма «шти» восходят к древнерусскому «съто» — «пропитание», «нечто сытное, корм», которое во множественном числе имело форму «съти». Производные от «съто» слова встречаются в памятниках XIV—XV веков, родственными щам словами в таком случае являются «сыт» и «насытить». По другой версии, «щи» могут происходить от «съчи» — «соки, жидкость», от этого же слова произошли такие слова, как «сок» и «щавель». По мнению И. А. Бодуэна де Куртенэ, «щи» имеют датские корни, от слова дат. sky — «похлёбка, навар», которое в свою очередь происходит от фр. jus — «сок». Слово «щи» имеет ласковую форму родительного падежа «щец» и прилагательное «щаной». В говорах встречаются «щечки», «ща», «щаги», и «шшы», диалектальные значения слова разнятся от «похлёбки из сушёной рыбы с крупой» до просто «капусты».');
INSERT INTO public.blog (id, user_id, dateadd, caption, caption_lat, photoorig, photopreview, description) VALUES (3, 1, TO_DATE('09.08.2023', 'DD.MM.YYYY'), 'Борщ', 'borsch', '/blogs/borsch/photo.jpg', '/blogs/borsch/photo.jpg', 'Борщ — горячий заправочный суп на основе свёклы, которая придаёт ему характерный красный цвет.

В словаре В. И. Даля — род щей, похлёбка из квашеной свёклы, на говядине и свинине, или со свиным салом. Традиционное блюдо восточных славян, основное первое блюдо украинской кухни.

Имеет около дюжины разновидностей, что связано с разобщением в прошлом украинских земель и с влиянием на формирование украинской кухни кулинарных обычаев и вкусов соседних народов. Получило широкое распространение во многих национальных кухнях: это блюдо есть у русских, украинцев (укр. борщ), белорусов (бел. боршч), поляков (barszcz «баршч»), литовцев (barščiai «барщчяй»), румын (borş «борш»), молдаван (борш, borş), евреев-ашкеназов (идиш ‏באָרשט‏‎).

В 2022 году Организация Объединённых Наций по вопросам образования, науки и культуры (ЮНЕСКО) объявила, что внесла культуру приготовления украинского борща в Список шедевров устного и нематериального культурного наследия человечества, нуждающегося в срочной охране, из-за риска того, что вторжение России повлияет на статус супа как культурного наследия Украины. Новый статус означает, что теперь Украина может подать заявку на получение специальных средств для финансирования проектов по продвижению и защите национальной вариации данного блюда.');
----------------
INSERT INTO public.category (id, user_id, caption, photopreview, bg, caption_lat) VALUES (1, 1, 'Напитки', '/category/napitki/photo.jpg', '/category/napitki/bg.jpg', 'napitki');
INSERT INTO public.category (id, user_id, caption, photopreview, bg, caption_lat) VALUES (2, 1, 'Супы', '/category/supy/photo.jpg', '/category/supy/bg.jpg', 'supy');
INSERT INTO public.category (id, user_id, caption, photopreview, bg, caption_lat) VALUES (3, 1, 'Салаты', '/category/salaty/photo.jpg', '/category/salaty/bg.jpg', 'salaty');
----------------
INSERT INTO public.recipe (id, user_id, category_id, dateadd, caption, caption_lat, photoorig, photopreview, shortdescription, cookingtext) VALUES (1, 1, 1, TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Морс из клюквы', 'mors_iz_klyukvy', '/recipe/mors_klyukvennyy/photo.jpg', '/recipe/mors_klyukvennyy/photo.jpg', 'Очень легко и просто сварить полезный клюквенный морс по этому рецепту всего из трёх ингредиентов. Пьем и наслаждаемся!', 'Клюкву перебрать и промыть. Сделать отвар. Для этого перебранную и промытую клюкву залить водой. Затем поставить на огонь, довести до кипения, прокипятить 10 минут на небольшом огне. Для сбора отвара поставить дуршлаг на другую кастрюлю. Ягоды вместе с отваром откинуть на дуршлаг. Ягоды размять, процедить и отжать в отвар. В отвар добавить сахар, довести до кипения и охладить.
Морс клюквенный готов. Можно подавать клюквенный морс к столу.');
INSERT INTO public.recipe (id, user_id, category_id, dateadd, caption, caption_lat, photoorig, photopreview, shortdescription, cookingtext) VALUES (2, 1, 2, TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Борщ', 'borsch', '/recipe/borsch/photo.jpg', '/recipe/borsch/photo.jpg', 'Борщ — горячий заправочный суп на основе свёклы, которая придаёт ему характерный красный цвет.', 'Налейте в кастрюлю холодную воду, выложите мясо и поставьте на средний огонь. Бульон будет вкуснее, если использовать именно мясо на кости. Следите за бульоном, перед закипанием снимите пену. Когда жидкость закипит, накройте кастрюлю крышкой и варите на медленном огне час-полтора. Вымойте и почистите свёклу, морковь и лук. Свёклу натрите на крупной тёрке, а морковь — на средней. Лук нарежьте небольшими кубиками. Налейте масло в сковороду, включите средний огонь. Обжаривайте лук и морковь, помешивая, около 5 минут. Затем выложите свёклу. Добавьте к ней лимонную кислоту, уксус или сок лимона. Благодаря этому борщ будет по-настоящему красным и приобретёт приятную кислинку. Готовьте зажарку ещё 5 минут. После этого добавьте томатную пасту, перемешайте и оставьте на огне ещё на 5–7 минут. Когда бульон сварится, выньте из него мясо. Пока оно остывает, засыпьте в кастрюлю нашинкованную капусту. Через 5–10 минут добавьте нарезанный соломкой или кубиками картофель. Порядок закладки овощей можно менять. Если капуста молодая, её лучше добавить уже после картошки. Ну или одновременно, если ваш сорт картофеля разваривается быстро.');
INSERT INTO public.recipe (id, user_id, category_id, dateadd, caption, caption_lat, photoorig, photopreview, shortdescription, cookingtext) VALUES (3, 1, 3,  TO_DATE('15.08.2023', 'DD.MM.YYYY'), 'Цезарь', 'cezar', '/recipe/cezar/photo.jpg', '/recipe/cezar/photo.jpg', 'Этот салат можно готовить по многим рецептам. Я предлагаю салат цезарь с курицей, доступный всем.', 'Отварить куриную грудку с добавлением соли.

Яйца порезать полукольцами, листья салата помыть и просушить. Помидорчики тоже вымыть. Сыр натереть на терке. Сухарики взять кубиками со вкусом сыра.

Все ингредиенты для заправки взбить блендером.

Салат выложить слоями:

1 - мясо куриное,

2 - сухарики,

3 - яйца,

4 - сыр,

5 - помидоры Черри,

Все залить соусом.

Салат выложить на целые листья салата. Сверху посыпать свежемолотой смесью перцев.');
----------------
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (1, 1, 1, 'Клюква - 1 стакан');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (2, 1, 1, 'Сахар - 0,5 стакана');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (3, 1, 1, 'Вода - 1 л.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (4, 1, 2, '300 г свежей белокочанной капусты;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (5, 1, 2, '4 средние картофелины;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (6, 1, 2, 'соль — по вкусу;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (7, 1, 2, '1-2 сушёных лавровых листа;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (8, 1, 2, 'зелень — по вкусу;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (9, 1, 2, '1 зубчик чеснока — опционально;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (10, 1, 2, 'щепотка молодой гвоздики — опционально;');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (11, 1, 2, 'щепотка молотого чёрного перца — опционально.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (13, 1, 3, 'Яйца вареные - 4 шт.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (14, 1, 3, 'Сухарики - 1 пачка');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (15, 1, 3, 'Сыр твёрдый - 200 г.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (12, 1, 3, 'Куриная грудка отварная - 300 г.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (16, 1, 3, 'Помидоры Черри - 200 г.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (17, 1, 3, 'Листья салата - 200 г.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (18, 1, 3, 'Соль - 10 г.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (19, 1, 3, 'Горчица - 2 ст. л.');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (20, 1, 3, 'Чеснок - 2 зубчика');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (21, 1, 3, 'Сок 1/2 лимона');
INSERT INTO public.ingredient (id, user_id, recipe_id, caption) VALUES (22, 1, 3, 'Масло оливковое - 100 мл.');
----------------
INSERT INTO public.phrase (id, user_id, caption) VALUES (2, 1, 'Хлеб всему голова');
INSERT INTO public.phrase (id, user_id, caption) VALUES (3, 1, 'Кому голодно, тому холодно');
INSERT INTO public.phrase (id, user_id, caption) VALUES (4, 1, 'Принимай еду как лекарство');
INSERT INTO public.phrase (id, user_id, caption) VALUES (1, 1, 'Спи, пока не проголодаешься и ешь, пока не захочешь спать');
----------------