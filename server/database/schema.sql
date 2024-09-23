create table user (
    id int unsigned primary key auto_increment not null,
    username VARCHAR(50) not null UNIQUE,
    email varchar(50) not null unique,
    hashed_password varchar(255) not null
);

create table note (
    id int unsigned primary key auto_increment not null,
    user_id int unsigned not null,
    title VARCHAR(50) not null,
    is_shared BOOLEAN DEFAULT false,
    content VARCHAR(255) not null,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

create table SharedNote (
    id int unsigned primary key auto_increment not null,
    user_id int unsigned not null,
    note_id int unsigned not null,
    is_hidden BOOLEAN not null DEFAULT false,
    shared_email VARCHAR(50) not null,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (note_id) REFERENCES note (id)
)