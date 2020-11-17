create table userSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname varchar(256),
    middlename varchar(256),
    lastname varchar(256),
    email varchar(256), -- they cannot change their email
    password varchar(256),
    token varchar(256),
    jsonwebtoken varchar(256),
    verified int(1) DEFAULT '0',
    location varchar(256),

    -- only when updating
    mobile_phone_number varchar(256),
    additional_mobile_number varchar(256),
    /*
        flat no.
        block no.
        street no.
    */
    address varchar(256), -- for later

    additional_info varchar(256),

    -- flat varchar(256),
    -- block varchar(256),
    -- street varchar(256),
    -- zone varchar(256),

    state_region varchar(256), -- state/region : Abuja_Kaura_District
    city varchar(256), -- Federal Capital Territory
    country varchar(256) DEFAULT 'Nigeria', -- Nigeria
    joined_timestamp varchar(256)
)

create table onlineUserSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    socket_id varchar(256),
    jsonwebtoken varchar(256),
)

create table onlineVisitorSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    socket_id varchar(256)
)

create table categorySchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name varchar(256),
    image varchar(256),
    sounds_like varchar(256),
    timestamp varchar(256)
)

create table productSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categoryId int(255),
    name varchar(256),
    image varchar(256), 
    price varchar(256),
    visible int(1) DEFAULT '1',
    starred int(1) DEFAULT '0',
    sounds_like varchar(256),
    timestamp varchar(256)
)

-- order will be created only when customer has paid the amount
create table orderSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userId int(255),
    status varchar(256) DEFAULT 'unfulfilled', -- fulfilled cancelled 
    price varchar(256), -- total price
    timestamp varchar(256)
)

create table orderedProductSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    productId int(255),
    price varchar(256),
    quantity int(255),
    orderId int(255) -- insert all at the same time -- from above
)

create table cartSchema (
    id int(255) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userId int(255),
    productId int(255),
    quantity int(255)
)