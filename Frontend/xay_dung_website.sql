
CREATE DATABASE website_selling_Bee_Watches
go
USE website_selling_Bee_Watches

--voucher

CREATE TABLE Products(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go 

select * from WatchDetails

CREATE TABLE Categories(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go 

CREATE TABLE Brands(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go 

CREATE TABLE Serials(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE MachineTypes(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE Genders(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE Straps(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE GlassMaterials(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE Features(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go



CREATE TABLE Origins(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE CaseMaterials(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE CaseColors(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go


CREATE TABLE Shapes(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE Sizes(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE WatchDetails(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_brand UNIQUEIDENTIFIER null,
    id_serial UNIQUEIDENTIFIER null,
    id_machine_type UNIQUEIDENTIFIER null ,-- dongf máy 
    id_gender UNIQUEIDENTIFIER null ,--gioi tinh
    id_strap UNIQUEIDENTIFIER null ,--dây đeo
    id_glass_material UNIQUEIDENTIFIER null ,--chất lệu kính 
    id_feature UNIQUEIDENTIFIER null,--tính năng
    id_size UNIQUEIDENTIFIER null ,--kích thức mặt kính
    id_origin UNIQUEIDENTIFIER null ,--xuat xu
    id_case_material UNIQUEIDENTIFIER null ,-- chất liệu vỏ
	id_case_color UNIQUEIDENTIFIER null ,
    id_shape UNIQUEIDENTIFIER null ,-- hình dạng
	id_product UNIQUEIDENTIFIER,
    price decimal null,
    quantity_stock BIGINT null,-- số lượng tồn
    description NVARCHAR(MAX) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
	status BIT null,
    is_deleted BIT null,
	foreign key(id_brand) references brands (id),
	foreign key(id_serial) references serials (id),
	foreign key(id_machine_type) references machinetypes (id),
	foreign key(id_gender) references genders (id),
	foreign key(id_strap) references straps (id),
	foreign key(id_glass_material) references glassmaterials (id),
	foreign key(id_feature) references features (id),
	foreign key(id_size) references sizes (id),
	foreign key(id_origin) references origins (id),
	foreign key(id_case_material) references casematerials (id),
	foreign key(id_shape) references shapes (id),
	foreign key(id_product) references products (id),
	foreign key(id_case_color) references casecolors (id),
)
go
--ALTER TABLE WatchDetails
--ADD id_category UNIQUEIDENTIFIER null;
--ALTER TABLE WatchDetails
--ADD foreign key(id_category) references categories(id)
--select * from Products
--insert into WatchDetails(id,id_brand,id_machine_type,id_gender,id_strap,id_glass_material,id_feature,id_size,id_origin,
--id_case_material,id_case_color,id_shape,id_product,price,quantity_stock,description)
--values(NewID(),'AD085BC6-D31A-4B81-8F3A-0A1D80D19756','C7D63C78-680C-435C-95CE-243089A69F6E','46C63D43-FFDE-4E80-B151-436DDC13414F',
--'253CC0EC-2DCF-4417-8264-07E4A1C354E4','D10F0DD9-C788-45DD-BD86-5BFB84AE753B','5084B774-E8A8-4FDB-A99C-00DFAF312E2D','431D9EE3-B4F9-4748-B8FD-0A47C61BDE2C',
--'AC934C1C-C386-49F3-B6BB-2B9C030C832F','BC7CC3A1-380B-42E8-B317-3C61474F872F','88978ED1-9FB9-4A96-9F1D-86F2BB328F18',
--'9EF15475-3E7C-40FE-A799-4716B41EA3D2','DD44E53F-D26E-4A7F-BBE2-0455B5F393D4',12,10,'Good'),
--(NewID(),'13363D4D-6D33-4174-A636-73DC8FFC30BD','C7D63C78-680C-435C-95CE-243089A69F6E','46C63D43-FFDE-4E80-B151-436DDC13414F',
--'0CCB5E2B-F21F-4348-B277-FF3BFD3CBB2F','D10F0DD9-C788-45DD-BD86-5BFB84AE753B','AA25DA87-82E2-45FA-8B6F-0C73513B5F2B','431D9EE3-B4F9-4748-B8FD-0A47C61BDE2C',
--'1F5170F1-58E7-4607-972F-7018F8DDCDC5','ECF88FD5-C42F-4BBE-9CA0-54DE23FD0249','88978ED1-9FB9-4A96-9F1D-86F2BB328F18',
--'9EF15475-3E7C-40FE-A799-4716B41EA3D2','DD44E53F-D26E-4A7F-BBE2-0455B5F393D4',15,100,'Normal'),
--(NewID(),'8D0C6B66-7985-4486-BB82-98A48F965E7D','A042EFA0-085B-4430-93E7-2C6196DFBCEB','46C63D43-FFDE-4E80-B151-436DDC13414F',
--'62428F60-11BC-4949-B1EA-57411BDBAF90','D10F0DD9-C788-45DD-BD86-5BFB84AE753B','CF858166-4F14-4CBD-B008-60EAE571662C','431D9EE3-B4F9-4748-B8FD-0A47C61BDE2C',
--'AC934C1C-C386-49F3-B6BB-2B9C030C832F','ECF88FD5-C42F-4BBE-9CA0-54DE23FD0249','2BBBE055-41D3-461F-8221-AEF8133CF0E7',
--'9EF15475-3E7C-40FE-A799-4716B41EA3D2','4664228A-CDFD-4690-A8B1-847FC802C942',20,50,'Very well'),
--(NewID(),'EA0486AB-7FB3-459E-8A60-F31F666BE9D8','E1A3F2A2-181A-4F64-991B-ABDCB391B064','A8C83D1F-542A-4C7E-9E33-44A91E80BCB8',
--'EBEE97C7-E001-4DF2-9A43-A6DE6D4194D2','5A788FFC-DC8A-4760-B86D-A61BDE877B37','824AB78C-7E99-4185-A16A-8630B420DA9F','0618A077-22EF-4CE3-841C-27F675BDFE19',
--'5D2EFF5B-06D1-4F70-8E33-A21DDF9C0CF7','5DBB7943-B94E-4A71-B60E-A2FCF608AD43','9FA75071-66CE-475B-A3D6-CE400E217FF0',
--'5DE5DD17-5DB4-4CF4-9E3A-7064ADCDE064','59CCD3B1-8ED8-416F-8E2D-A13311925A26',20,15,'Perfect'),
--(NewID(),'AD085BC6-D31A-4B81-8F3A-0A1D80D19756','C3E9A9EF-FCA0-4518-9CBB-E7266A7ACEDE','A8C83D1F-542A-4C7E-9E33-44A91E80BCB8',
--'0CCB5E2B-F21F-4348-B277-FF3BFD3CBB2F','89485BFC-E70F-49EF-AD99-B9D7152CFFFB','824AB78C-7E99-4185-A16A-8630B420DA9F','0618A077-22EF-4CE3-841C-27F675BDFE19',
--'AC934C1C-C386-49F3-B6BB-2B9C030C832F','5DBB7943-B94E-4A71-B60E-A2FCF608AD43','D847D630-32AF-47AF-9841-DF904752A49D',
--'5DE5DD17-5DB4-4CF4-9E3A-7064ADCDE064','D7DAEFE7-19FA-425D-80A3-E3042DFCB71A',40,70,'Good')
--go


CREATE TABLE Images(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_watch_detail UNIQUEIDENTIFIER null,
    image_link NVARCHAR(MAX) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
	foreign key (id_watch_detail) references watchdetails(id)
)
go

create table VoucherTypes (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    description NVARCHAR(MAX) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

create table Vouchers (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_voucher_type UNIQUEIDENTIFIER null,
    code NVARCHAR(20) null,
    name NVARCHAR(30) null,
    sale_price decimal null, -- giảm theo giá 
    sale_percent Integer null, -- giảm theo %
    min_price decimal null,
    description NVARCHAR(MAX) null,
    start_date DATE null,
    end_date DATE null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
	foreign key(id_voucher_type) references vouchertypes(id)
)
go

CREATE TABLE PromoTypes (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    code NVARCHAR(30) null,
    name NVARCHAR(30) null,
    description NVARCHAR(MAX) null,
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE Promos(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_promo_type  UNIQUEIDENTIFIER,
    code NVARCHAR(30) null,
    name NVARCHAR(30) null,
    start_date DATE null,
    end_date DATE null,
    description NVARCHAR(MAX) null,
    sale_percent Integer null, -- giảm theo %
    created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
	foreign key(id_promo_type) references promotypes(id)
)
go

-- acount

CREATE table Address(
    id UNIQUEIDENTIFIER PRIMARY KEY,
	id_account UNIQUEIDENTIFIER Null,
    province_code nvarchar(50) null, -- mã thanh pho 
    district_code NVARCHAR(50) null, --mã quận
    town_code NVARCHAR(50) null, --mã xã
    address_detail NVARCHAR(MAX) null,
	created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
	foreign key(id_account) references accounts(id)
)
go
select * from Address


insert into Address(id, province_code,district_code,town_code,address_detail)
values(newid(),N'Thành phố Hà Nội',N'Thị trấn Đông Anh','Xã Uy Nỗ','Xóm Trong'),
(newid(),N'Thành phố Hà Nội',N'Thị trấn Đông Anh','Xã Cổ Loa','Xóm Kiu'),
(newid(),N'Thành phố Hà Nội',N'Thị trấn Đông Anh','Xã Bắc Hồng','Hai Lang'),
(newid(),N'Thành phố Hồ Chí Minh',N'Quận 1','Phường Bến Nghé','Trâu Nghé'),
(newid(),N'Thành phố Hồ Chí Minh',N'Quận 1','Phường Đa Ngao','Làng Bí Đao'),
(newid(),N'Tỉnh Bình Dương',N'Huyện Bầu Bàng','Xã Trừ Văn Thố','Làng Thổ Kì')
go

CREATE TABLE Roles(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    name nvarchar(20) null, -- mã giá 
)
go
--insert into Roles(id,name) values(newid(),'CUST'),
--(newid(),'ADM'),
--(newid(),'STAFF')
--go

insert into Accounts(id,username,pass,email,phone)
values(NEWID(),'user1','1','user1@gmail.com','0123456781'),
(NEWID(),'user2','2','user2@gmail.com','0123456782'),
(NEWID(),'user3','3','user3@gmail.com','0123456783'),
(NEWID(),'user4','4','user4@gmail.com','0123456784'),
(NEWID(),'user5','5','user5@gmail.com','0123456785')
go

select * from Address
select * from Roles

insert into AccountRoles(id_account,id_role)
values('0939A468-FC11-43E1-9F92-CF7CD432D0A5','7E405CD9-047E-4F1D-BCEE-85D54B982C78'),
('1AB0B544-8F38-4DEE-9732-F0A33E8BDF10','B94FB129-95FE-4601-ADFF-FD2B6B082FBA'),
('720658B1-EB08-4FC1-B503-BDB17E368D6F','E28A4CBF-602C-46F4-B0FF-D468F9F214E5'),
('4EDF90AE-4054-4A05-A60B-BC82FB8D79B6','E28A4CBF-602C-46F4-B0FF-D468F9F214E5'),
('19B03DCE-1C00-427B-8EAD-60D09B85730B','E28A4CBF-602C-46F4-B0FF-D468F9F214E5')
go

CREATE Table Accounts(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    username NVARCHAR(30) null,
    pass VARCHAR(50) null,
    fullname NVARCHAR(30) null,
    gender bit null,
    date_of_birth DATE null,
    email NVARCHAR(30) null,
    phone NVARCHAR(30) null,
    avatar NVARCHAR(MAX) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
)
go

CREATE TABLE AccountRoles(
	id INT	IDENTITY(1,1) PRIMARY KEY,
    id_account UNIQUEIDENTIFIER,
	id_role UNIQUEIDENTIFIER,
	foreign key(id_account) references accounts (id),
	foreign key(id_role) references roles (id),
)
go

CREATE TABLE PaymentMethods(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    name NVARCHAR(30) null,
	created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
)
go
insert into PaymentMethods(id,name)
values(newid(),N'Thanh toán khi nhận hàng'),
(newid(),N'VNPay'),
(newid(),N'Momo'),
(newid(),N'Thanh toán tại quầy')
go
select* from Orders
select* from OrderDetails
select* from accounts
--delete  from OrderDetails
--delete  from Orders

CREATE TABLE Orders(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_account UNIQUEIDENTIFIER null,
    id_address UNIQUEIDENTIFIER null,
    id_payment_method uniqueidentifier null,
    code NVARCHAR(30) null,
	 name_user nvarchar(50) null,
	 sdt_user nvarchar(11) null,
	 address_user nvarchar(max) null,
    total_money decimal null,
    total_payment decimal null,
	total_payment_off decimal null,
    date_payment DATE null,
    shipping_price decimal null,
    shipping_date DATE null,
    received_date DATE null,
	created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    create_date DATE null,
    update_date DATE null,
    status int null,
    is_deleted BIT null,
	foreign key(id_address) references address(id),
	foreign key(id_account) references accounts(id),
	foreign key(id_payment_method) references paymentmethods(id)
)
go
alter table Orders
alter column address_user nvarchar(max) null
select * from Orders

--insert into OrderDetails(id) values(newid())
select * from PaymentMethods
select * from Address
select * from Accounts


CREATE TABLE OrderDetails(
    id UNIQUEIDENTIFIER PRIMARY KEY,
    id_order UNIQUEIDENTIFIER null,
    id_watch_detail UNIQUEIDENTIFIER null,
    quantity BIGINT null,
    total_price decimal null,
	created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
    is_deleted BIT null,
	foreign key(id_order) references orders(id),
	foreign key(id_watch_detail) references watchdetails(id),
)
go

select * from Orders
select * from WatchDetails


create TABLE Favourites(
    id UNIQUEIDENTIFIER PRIMARY KEY,
	created_by NVARCHAR(25) null,
    updated_by NVARCHAR(25) null,
    created_date DATE null,
    update_date DATE null,
)
go


--Brand
insert into Brands(id,code,name) values (NewID(),'BR001','Quốc Đạt'),
									(NewID(),'BR002','Quốc Tuấn'),
									(NewID(),'BR003','Quốc Đức'),
									(NewID(),'BR004','Minh Hải'),
									(NewID(),'BR005','Quốc Văn')

--Gender
insert into Genders(id,code,name) values (NewID(),'GD001','DDDD11'),
										(NewID(),'GD002','DDDD22'),
										(NewID(),'GD003','DDDD33'),
										(NewID(),'GD004','DDDD44'),
										(NewID(),'GD005','DDDD55')

--Feature
insert into Features(id,code,name) values (NewID(),'F001','Features1'),
										(NewID(),'F002','Features2'),
										(NewID(),'F003','Features3'),
										(NewID(),'F004','Features4'),
										(NewID(),'F005','Features5')

--Size
insert into Sizes(id,code,name) values (NewID(),'S001','Size001'),
										(NewID(),'S002','Size002'),
										(NewID(),'S003','Size003'),
										(NewID(),'S004','Size004'),
										(NewID(),'S005','Size005')

--Shape
insert into Shapes(id,code,name) values (NewID(),'S001','Shape1'),
										(NewID(),'S002','Shape2'),
										(NewID(),'S003','Shape3'),
										(NewID(),'S004','Shape4'),
										(NewID(),'S005','Shape5')

--Origin
insert into Origins(id,code,name) values (NewID(),'OR001','Origin1'),
										(NewID(),'OR002','Origin2'),
										(NewID(),'OR003','Origin3'),
										(NewID(),'OR004','Origin4'),
										(NewID(),'OR005','Origin5')

--MachineType
insert into MachineTypes(id,code,name) values (NewID(),'M001','MachineType1'),
										(NewID(),'M002','MachineType2'),
										(NewID(),'M003','MachineType3'),
										(NewID(),'M004','MachineType4'),
										(NewID(),'M005','MachineType5')

--Products
insert into Products(id,code,name) values (NewID(),'P001','Products1'),
										(NewID(),'P002','Products2'),
										(NewID(),'P003','Products3'),
										(NewID(),'P004','Products4'),
										(NewID(),'P005','Products5')

--CaseColor
insert into CaseColors(id,code,name) values (NewID(),'CA001','CaseColor1'),
										(NewID(),'CA002','CaseColor2'),
										(NewID(),'CA003','CaseColor3'),
										(NewID(),'CA004','CaseColor4'),
										(NewID(),'CA005','CaseColor5')

--CaseMaterial
insert into CaseMaterials(id,code,name) values (NewID(),'CM001','CaseMaterial1'),
										(NewID(),'CM002','CaseMaterial2'),
										(NewID(),'CM003','CaseMaterial3'),
										(NewID(),'CM004','CaseMaterial4'),
										(NewID(),'CM005','CaseMaterial5')

--GlassMaterial
insert into GlassMaterials(id,code,name) values (NewID(),'G001','GlassMaterial1'),
										(NewID(),'G002','GlassMaterial2'),
										(NewID(),'G003','GlassMaterial3'),
										(NewID(),'G004','GlassMaterial4'),
										(NewID(),'G005','GlassMaterial5')

--Strap
insert into Straps(id,code,name) values (NewID(),'T001','Strap1'),
										(NewID(),'T002','Strap2'),
										(NewID(),'T003','Strap3'),
										(NewID(),'T004','Strap4'),
										(NewID(),'T005','Strap5')

--Serial

insert into Categories(id,code,name) values (NewID(),'CT001',N'Đồng hồ cơ'),
										(NewID(),'CT002','Đồng hồ điện tử'),
										(NewID(),'CT003','Đồng hồ thể thao'),
										(NewID(),'CT004','Đồng hồ thông minh')
										go

select * from Brands
select * from Serials
select * from MachineTypes
select * from Genders
select * from Straps
select * from GlassMaterials
select * from Features
select * from Sizes
select * from Origins
select * from CaseMaterials
select * from Shapes
select * from Products
select * from CaseColors
select * from WatchDetails


