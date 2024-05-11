CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    image_url VARCHAR(255),
    create_date DATETIME,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    create_by INT,
    update_by INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    language_code VARCHAR(255)
);

CREATE TABLE user_instance (
    user_instance_id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT,
    user_id INT,
    status_id INT,
    create_date DATETIME,
    create_by INT,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by INT,
    is_default_tenant BOOLEAN,
    settings TEXT
);

CREATE TABLE domain (
    domain_id INT AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(255),
    domain_details TEXT,
    create_date DATETIME,
    create_by INT,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by INT
);

CREATE TABLE sub_domain (
    sub_domain_id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT,
    sub_domain_name VARCHAR(255),
    sub_domain_details VARCHAR(255),
    create_date DATETIME,
    create_by INT,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by INT
);

CREATE TABLE kpi (
    kpi_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_domain_id INT,
    kpi_name VARCHAR(255),
    create_date DATETIME,
    create_by INT,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by INT
);

ALTER TABLE user_instance ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_instance ADD FOREIGN KEY (create_by) REFERENCES users(user_id);
ALTER TABLE user_instance ADD FOREIGN KEY (update_by) REFERENCES users(user_id);

ALTER TABLE domain ADD FOREIGN KEY (create_by) REFERENCES users(user_id);
ALTER TABLE domain ADD FOREIGN KEY (update_by) REFERENCES users(user_id);

ALTER TABLE sub_domain ADD FOREIGN KEY (domain_id) REFERENCES domain(domain_id);
ALTER TABLE sub_domain ADD FOREIGN KEY (create_by) REFERENCES users(user_id);
ALTER TABLE sub_domain ADD FOREIGN KEY (update_by) REFERENCES users(user_id);

ALTER TABLE kpi ADD FOREIGN KEY (sub_domain_id) REFERENCES sub_domain(sub_domain_id);
ALTER TABLE kpi ADD FOREIGN KEY (create_by) REFERENCES users(user_id);
ALTER TABLE kpi ADD FOREIGN KEY (update_by) REFERENCES users(user_id);



----Data for table `users`-------
INSERT INTO users ( name, email, image_url, create_date, update_date, create_by, update_by, first_name, last_name, language_code)
VALUES ( 'Vihsad', 'vishadrai@mail.com', NULL, NOW(), NOW(), 1, 1, 'Vishad', 'Rai', 'en');

----Data for table `user_instance`----
INSERT INTO user_instance ( tenant_id, user_id, status_id, create_date, create_by, update_date, update_by, is_default_tenant, settings)
VALUES ( 1, (select user_id from users where email='vishadrai@mail.com'), NULL, NOW(), 1, NOW(), 1, true, NULL);


--- data for table `domain`---
insert into domain(domain_name) values  ('Environment, Social and Governance');
insert into domain(domain_name) values  ('Internet of Things');
insert into domain(domain_name) values  ('Retail Innovation');
insert into domain(domain_name) values  ('Realty Management');
insert into domain(domain_name) values  ('Cyber Security');
insert into domain(domain_name) values  ('SAP');


--- data for table `sub_domain`---

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Climate Change', 'Environmental');

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Labor Standards', 'Social');

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Bio-diversity Conservations', 'Governance');

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Executive Compensations', 'Governance');

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Pollution prevention and control', 'Environmental');

insert into sub_domain(domain_id, sub_domain_name, sub_domain_details) values  (
(select domain_id from domain where domain_name = 'Environment, Social and Governance'),
'Health and safety in the workplace', 'Social');


--- data for table `kpi`---
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Carbon Emissions Reduction');
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Renewable Energy Adoption');
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Energy Efficiency');
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Climate Resilience and Adaptation');
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Financial Performance');
insert into kpi(sub_domain_id, kpi_name) values ((select sub_domain_id from sub_domain where sub_domain_name = 'Climate Change'),'Stock Performance');
