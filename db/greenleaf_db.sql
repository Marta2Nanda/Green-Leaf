DROP DATABASE IF EXISTS greenleaf;
create database greenleaf;

drop table if exists users;
create table users (
user_email VARCHAR(45) not null primary key,
user_name VARCHAR(45) not null,
user_password VARCHAR(45) not null,
user_type VARCHAR(45) not null
);

drop table if exists recommendations;
create table recommendations (
recommendation_id INTEGER AUTO_INCREMENT not null primary key,
user_email VARCHAR(45) not null,
recommendation_title VARCHAR(45) not null,
recommendation_text varchar(255) not null,
recommendation_location VARCHAR(45) not null,
recommendation_category varchar(45) not null,
recommendation_link varchar(60),
recommendation_pic varchar(255),
recommendation_rating integer,
votes integer,
rating_total bigint,
average_rating decimal(4,2),
is_approved varchar(45)
);

insert into users (user_email, user_name, user_password, user_type) values ('marta@ait.ie', 'Marta', '148fc783367e6a74', 'admin');
insert into users (user_email, user_name, user_password, user_type) values ('anna@ait.ie', 'Anna', '148fc783367e6a74', 'user');
insert into users (user_email, user_name, user_password, user_type) values ('minka@ait.ie', 'Minka', '148fc783367e6a74', 'user');

insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null, 'minka@ait.ie' , 'Silver Oak - indian restaurant', 'perfect place if you like vegetarian and spicy food',
'Athlone','restaurants', 'http://thesilveroak.ie/', 'silver_oak.jpg', 0, 0, 0, 0.0, 'reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'anna@ait.ie', 'Freshii', 'excellent place to eat, all options served in vegetarian/vegan variation, delicious fresh smooties',
'Dublin','restaurants', 'https://www.freshii.com/ir', 'freshii.jpg',2, 1, 2, 2.0, 'reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'minka@ait.ie', 'Cork-Nutrition-Clinic', 'excellent complex service in reasonable price',
'Cork','nutritions', 'www.facebook.com/Cork-Nutrition-Clinic-672764792798370/', 'nutrition_cork.jpg', 3, 1, 3, 3.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'anna@ait.ie', 'Green Lodge', 'excellent place to stay, serving delicious vegetarian/vegan food',
'Bantry','hotels', 'http://homepage.eircom.net/~greenlodge/', 'greenLodge.gif', 4, 1, 4, 4.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values 
(null,'minka@ait.ie', 'Adelphi Guesthouse', 'high standard rooms with tasty and fresh prepared breakfast served',
'Dublin','hotels', 'http://www.adelphidublin.com/Accommodation-Dublin-City/', 'adelphiB&B.jpg',5, 1, 5, 5.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values 
(null,'minka@ait.ie', 'Eggless cakes', 'delicious cakes in reasonable prices!',
'Lucan','bakery', 'https://www.facebook.com/Egglesscakes.ie/', 'egglesscakes.jpg', 1, 1, 1, 1.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'anna@ait.ie', 'Kat Von D Beauty', 'high standard branded vegan cosmetics. For order online or buy in local Debenhams store',
'Ireland','cosmetics', 'https://www.katvondbeauty.com/', 'kat_von_d_beauty.png', 1, 1, 1, 1.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values 
(null,'minka@ait.ie', 'MSC Ventures Ltd', 'amazing handmade, tailored to your expectation quality food available on order',
'Glanmire','food', 'https://www.msc-ventures.com/', 'msc-ventures.webp', 2, 1, 2, 2.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'minka@ait.ie', 'Tofurky', 'best option for american food fanatics without compromising your vegan diet!',
'Ireland','food', 'https://tofurky.com/', 'tofurky.jpg', 3, 1, 3, 3.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values 
(null,'anna@ait.ie', 'Bohemian Chic Minerals Vegan Cosmetics', 'Wonderful to find someone so passionate about their makeup products.',
'Ireland','cosmetics', 'www.facebook.com/BohemianChicMineralsVeganCosmetic/', 'bohemian_chic_minerals.jpg', 4, 1, 4, 4.0, 'not reviewed');
insert into recommendations (recommendation_id, user_email, recommendation_title, recommendation_text,
recommendation_location, recommendation_category, recommendation_link, recommendation_pic,
recommendation_rating, votes, rating_total, average_rating, is_approved) values
(null,'anna@ait.ie', 'Vegusto', 'Yummy food delivered to you. Perfect if you don\'t wan\'t give up cheese while beeing vegan!',
'Ireland','food', 'https://vegusto.co.uk/', 'vegusto.jpg', 5, 1, 5, 5.0, 'not reviewed');

select * from users;
select * from recommendations;