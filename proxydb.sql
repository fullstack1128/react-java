--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: configurations; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.configurations (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    key character varying(50) NOT NULL,
    value text NOT NULL,
    description character varying(100) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.configurations OWNER TO proxydb;

--
-- Name: configurations_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.configurations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configurations_id_seq OWNER TO proxydb;

--
-- Name: configurations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.configurations_id_seq OWNED BY public.configurations.id;


--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO proxydb;

--
-- Name: licenses; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.licenses (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    start_date timestamp without time zone NOT NULL,
    expired_date timestamp without time zone NOT NULL,
    location character varying(50),
    isp character varying(50),
    status character varying(50) NOT NULL,
    customer_id bigint,
    http_proxy_id bigint,
    sock_proxy_id bigint,
    package_id bigint,
    transaction_id bigint,
    auth_user character varying(50),
    ip_whitelist character varying(50),
    last_change_ip timestamp without time zone,
    last_change_location timestamp without time zone,
    last_change_isp timestamp without time zone,
    note character varying(50),
    modem_type character varying(10) DEFAULT 'MOBILE'::character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    auto_rotation_time integer
);


ALTER TABLE public.licenses OWNER TO proxydb;

--
-- Name: licenses_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.licenses_id_seq OWNER TO proxydb;

--
-- Name: licenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.licenses_id_seq OWNED BY public.licenses.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.locations (
    id bigint NOT NULL,
    name character varying(1000) NOT NULL,
    seq integer NOT NULL
);


ALTER TABLE public.locations OWNER TO proxydb;

--
-- Name: modems; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.modems (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    name character varying(50) NOT NULL,
    user_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    domain character varying(100) NOT NULL,
    location character varying(50) NOT NULL,
    type character varying(50) NOT NULL,
    isp character varying(50) NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.modems OWNER TO proxydb;

--
-- Name: modems_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.modems_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modems_id_seq OWNER TO proxydb;

--
-- Name: modems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.modems_id_seq OWNED BY public.modems.id;


--
-- Name: packages; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.packages (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    name character varying(50) NOT NULL,
    time_unit character varying(50) NOT NULL,
    duration integer NOT NULL,
    price numeric NOT NULL,
    status character varying(10),
    allow_change_ip integer,
    allow_change_location integer,
    min_time_change_ip integer,
    type character varying(10) NOT NULL,
    location character varying(50),
    seq integer DEFAULT 1,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    isp character varying(50),
    content text
);


ALTER TABLE public.packages OWNER TO proxydb;

--
-- Name: packages_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.packages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_id_seq OWNER TO proxydb;

--
-- Name: packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.packages_id_seq OWNED BY public.packages.id;


--
-- Name: proxys; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.proxys (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    modem_id bigint NOT NULL,
    raw text NOT NULL,
    xproxy_id integer,
    status character varying(20) NOT NULL,
    xproxy_position integer NOT NULL,
    shared_port integer,
    port_type character varying(50),
    authentication_users character varying(100),
    authorization_ips character varying(100),
    sale_status character varying(10) NOT NULL,
    counter_ul_used_bytes bigint,
    counter_dl_used_bytes bigint,
    counter_all_used_bytes bigint,
    counter_all_updated character varying(50),
    web_blacklist character varying(100),
    web_whitelist character varying(100),
    host character varying(100),
    modem_type character varying(10) DEFAULT 'MOBILE'::character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    brother_port integer,
    public_ip character varying(50)
);


ALTER TABLE public.proxys OWNER TO proxydb;

--
-- Name: proxys_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.proxys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proxys_id_seq OWNER TO proxydb;

--
-- Name: proxys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.proxys_id_seq OWNED BY public.proxys.id;


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.refresh_tokens (
    id bigint NOT NULL,
    refresh_token character varying(1000) NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO proxydb;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refresh_tokens_id_seq OWNER TO proxydb;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    customer_id bigint NOT NULL,
    amount numeric NOT NULL,
    currency character varying(255) NOT NULL,
    type character varying(10) NOT NULL,
    status character varying(10) NOT NULL,
    description text,
    note text,
    reference_id character varying(200),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    pay_address character varying(50),
    pay_amount numeric,
    pay_currency character varying(50)
);


ALTER TABLE public.transactions OWNER TO proxydb;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO proxydb;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: proxydb
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    uuid uuid NOT NULL,
    user_name character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(30),
    role character varying(10) NOT NULL,
    balance numeric NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status character varying(10) NOT NULL,
    address character varying(100),
    country character varying(100),
    city character varying(100),
    reminder integer DEFAULT 1
);


ALTER TABLE public.users OWNER TO proxydb;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: proxydb
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO proxydb;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proxydb
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: configurations id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.configurations ALTER COLUMN id SET DEFAULT nextval('public.configurations_id_seq'::regclass);


--
-- Name: licenses id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.licenses ALTER COLUMN id SET DEFAULT nextval('public.licenses_id_seq'::regclass);


--
-- Name: modems id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.modems ALTER COLUMN id SET DEFAULT nextval('public.modems_id_seq'::regclass);


--
-- Name: packages id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.packages ALTER COLUMN id SET DEFAULT nextval('public.packages_id_seq'::regclass);


--
-- Name: proxys id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.proxys ALTER COLUMN id SET DEFAULT nextval('public.proxys_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: configurations; Type: TABLE DATA; Schema: public; Owner: proxydb
--

COPY public.configurations (id, uuid, key, value, description, created_at, updated_at) FROM stdin;
1	c1b11b93-a782-43b3-a145-ea31175a2797	NOW_PAYMENTS_API_KEY	9X3D6DR-7VJMASM-KX58T1Y-C1SVMHM	Api key of nowpayments	2022-09-16 16:10:38.881467	2022-09-26 07:58:02.927551
7	062b64dc-3857-457f-804c-3071584a0701	EMAIL_SERVER_PASSWORD	zpfdzysphtfmnvwc	Email Server Password	2022-12-30 02:00:54.490328	2023-01-17 09:24:53.629772
2	b5f3ae6a-bb0f-4cb2-840e-e6af40d89dcd	EMAIL_TEMPLATE_PURCHASE	<p>Hello #USER_NAME,<br />\nThank you very much for your order! This email contains all your order details:</p>\n[begin]\n\n<p>Package: #PACKAGE_NAME<br />\nSubscription: #START_DATE - #END_DATE</p>\n\n<p>HTTP : #FORMAT_HTTP<br />\nSocks5: #FORMAT_SOCK5</p>\n\n<p>Status link: #LINK_STATUS<br />\nRotation ip link: #LINK_CHANGE_IP</p>\n[end]\n\n<p>To modify your user:password or set rotation speed you could access our dashboard.</p>\n\n<p>Feel free to reach out if you have any issue or question. Telegram: @ProxyNL</p>\n\n<p>Thank you,<br />\n4GproxyNL</p>\n	Email template for purchase	2022-12-30 02:00:51.056328	2023-01-04 15:41:38.087332
8	8c5a557a-24d5-4800-a86d-4e830e1123db	EMAIL_SERVER_SENDER	contact@4gproxy.nl	Email Server Sender	2022-12-30 08:19:51.16128	2022-12-30 11:40:32.784431
6	be3ccbb3-fda2-4478-ad39-c7774f6dd8de	EMAIL_SERVER_USERNAME	contact@4gproxy.nl	Email Server Username	2022-12-30 02:00:53.811328	2022-12-30 11:42:21.343659
4	b0cbe3ee-0ed9-4ff3-8e5a-fc0245c9d3cc	EMAIL_SERVER_HOST	smtp.yandex.com	Email Server Host	2022-12-30 02:00:52.454327	2022-12-30 11:44:57.490748
5	9dda1914-dcf1-488e-b738-99d09eeb96a2	EMAIL_SERVER_PORT	465	Email Server Port	2022-12-30 02:00:53.133328	2022-12-30 11:46:01.167849
3	54524f22-3dd5-4c32-938b-e3980767dba6	EMAIL_TEMPLATE_EXPIRING	<p>Hi #USER_NAME,</p>\n\n<p>Your proxy is expiring in 24 hours. If you like to renew your subscription feel free to contact us on Telegram or use our dashboard to extend.</p>\n\n<p>#PACKAGE_NAME : #START_DATE - #END_DATE</p>\n\n<p>Have a good day,<br />\n4GproxyNL<br />\n<br />\nUse our dashboard to disable these notifications</p>\n\n<p>&nbsp;</p>\n	Email template for the reminder	2022-12-30 02:00:51.775332	2023-01-04 18:20:41.473101
12	a80ba3e0-e849-43c7-b723-1212fbba79b1	STRIPE_API_SECRET_KEY	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	Stripe API secret key	2023-01-14 08:42:45.84058	2023-01-14 12:04:59.032309
13	39e40d67-07f7-4d01-a3cc-639c1f55f62d	STRIPE_WEBHOOK_SECRET_KEY	whsec_nxbxjAUFHZ5AYAeuTP6VVB18poQI6hWr	Stripe webhook secret key	2023-01-14 08:42:45.846662	2023-01-15 09:02:01.948436
11	6e411100-5280-441e-ac43-3f51d2ed5593	STRIPE_ENABLE	1	Stripe Enable (1 for enable)	2023-01-14 08:42:12.445757	2023-01-19 12:11:24.822035
9	c7ca6729-299b-49e0-b0a8-bd595646c054	HTML_CUSTOMER_PAGE	<figure class="easyimage easyimage-full"><img alt="" src="https://i.imgur.com/WviMcfs.jpeg" width="700" />\n<figcaption></figcaption>\n</figure>\n\n<p>1. HTTP + Socks5 port buttons to copy and paste to clipboard<br />\n2. Button to rotate current IP. ( <em>wait 20 seconds and refresh page for results</em> )<br />\n3. Status API link containing your user:pass, previous and current ip.<br />\n4. Button that will copy your IP rotation link to clipboard.<br />\n5. This button allows to setup automatic rotation (<em><strong> limited by 5 minutes </strong></em>)<br />\n6. Reboot your device. Only use when your dongle has instability.<br />\n7. Can be used to generate new user:pass or change your ip whitelist.<br />\n8. Extend your proxy. You can only extend your current plan so <strong>daily-&gt;daily</strong>. Ask support if you want to go daily-&gt;monthly for a change.<br />\n9.<strong> Export </strong>your proxy in <strong>various </strong>formats to an txt file. Also works for status api and rotation link.<br />\n&nbsp;</p>\n\n<p><strong>Q. </strong>How long does it take before my crypto balance is added?<br />\n<strong>A. </strong>This can take up to 30 minutes depending on your exchange, gas and network status.</p>\n\n<p><strong>Q.</strong> I have bought a daily proxy and I want to extend by a month?<br />\n<strong>A.</strong> Contact support to modify your plan<br />\n<br />\n<strong>Q.</strong> What crypto currencies do you accept?<br />\n<strong>A. </strong>USDT (trc20 &amp; erc20) / Bitcoin / Litecoin / BUSD</p>\n\n<p><strong>Q.</strong> Do you accept anything else besides crypto?<br />\n<strong>A. </strong>Yes, feel free to contact support to work something out.</p>\n\n<p><strong>Q.</strong> How do i get support?<br />\n<strong>A.</strong> Message us on Telegram @ProxyNL or write an e-mail: 4gproxynl@gmail.com</p>\n\n<p><strong>Q.</strong> Can i pay using creditcard?<br />\n<strong>A.</strong> Yes, use the second option located on the recharge page.</p>\n\n<p><strong>Troubleshooting guide:</strong><br />\n<em>Steps to take in case you are unable to use your proxy</em></p>\n\n<p>1. Verify if you use the right port number (HTTP or SOCKS)<br />\n2. Make sure you did not exceed daily data limits<br />\n3. Compare the user: password you use with the ones found in dashboard<br />\n4. Reboot your modem using the &quot;reboot device&quot; button<br />\n5. Change the user: pass or IP whitelist details using the &quot;Authentication&quot; button</p>\n\n<p>If these steps wont work and your proxy does not work, feel free to contat support.<br />\n<br />\n<strong>Usefull proxy add-ons</strong><br />\nChrome: https://tinyurl.com/5bpxb4nd<br />\nFirefox: https://tinyurl.com/mrxmut7j</p>\n	HTML Customer Page	2023-01-08 14:59:13.670979	2023-02-03 20:23:30.078478
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: proxydb
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	CREATE TABLE USERS	SQL	V1__CREATE_TABLE_USERS.sql	318251097	proxydb	2022-09-04 15:55:53.464992	52	t
2	2	CREATE TABLE MODEMS	SQL	V2__CREATE_TABLE_MODEMS.sql	854578946	proxydb	2022-09-11 03:00:08.212537	55	t
3	3	CREATE TABLE PROXYS	SQL	V3__CREATE_TABLE_PROXYS.sql	707498490	proxydb	2022-09-11 03:00:08.366812	25	t
4	4	CREATE TABLE LICENSES	SQL	V4__CREATE_TABLE_LICENSES.sql	-233575398	proxydb	2022-09-11 03:00:08.459961	42	t
5	5	CREATE TABLE PACKAGES	SQL	V5__CREATE_TABLE_PACKAGES.sql	663224579	proxydb	2022-09-11 03:00:08.544301	32	t
6	6	CREATE TABLE TRANSACTIONS	SQL	V6__CREATE_TABLE_TRANSACTIONS.sql	356418269	proxydb	2022-09-11 03:00:08.636603	31	t
7	8	CREATE TABLE REFRESH TOKENS	SQL	V8__CREATE_TABLE_REFRESH_TOKENS.sql	-2081102463	proxydb	2022-09-11 03:00:08.737419	43	t
8	9	CREATE TABLE CONFIGURATIONS	SQL	V9__CREATE_TABLE_CONFIGURATIONS.sql	-1611641738	proxydb	2022-09-11 03:00:08.843603	24	t
9	10	CREATE TABLE LOCATIONS	SQL	V10__CREATE_TABLE_LOCATIONS.sql	-561995528	proxydb	2022-09-11 03:00:08.919254	21	t
10	11	UPDATE TABLE PROXY	SQL	V11__UPDATE_TABLE_PROXY.sql	-1261705774	proxydb	2022-09-15 04:24:49.96508	60	t
11	12	UPDATE TABLE USERS	SQL	V12__UPDATE_TABLE_USERS.sql	-1773488374	proxydb	2022-09-21 16:16:39.437756	1641	t
12	13	UPDATE TABLE PACKAGES	SQL	V13__UPDATE_TABLE_PACKAGES.sql	-963410248	proxydb	2022-09-21 22:27:14.241543	1294	t
13	14	UPDATE TABLE TRANSACTIONS	SQL	V14__UPDATE_TABLE_TRANSACTIONS.sql	-678992500	proxydb	2022-09-28 15:48:44.017071	53	t
14	15	UPDATE TABLE LICENSES	SQL	V15__UPDATE_TABLE_LICENSES.sql	1013039014	proxydb	2022-09-28 15:48:44.154788	25	t
15	16	UPDATE TABLE USERS 2	SQL	V16__UPDATE_TABLE_USERS_2.sql	1027548517	proxydb	2022-10-03 16:00:11.882223	1369	t
16	17	UPDATE TABLE PROXY 2	SQL	V17__UPDATE_TABLE_PROXY_2.sql	-180273037	proxydb	2022-12-17 16:29:37.903235	64	t
17	18	UPDATE TABLE CONFIG	SQL	V18__UPDATE_TABLE_CONFIG.sql	1094215722	proxydb	2022-12-30 07:53:24.856275	1362	t
18	19	UPDATE TABLE USER	SQL	V19__UPDATE_TABLE_USER.sql	-636220965	proxydb	2023-01-02 15:04:26.958688	47	t
19	20	UPDATE TABLE PACKAGE	SQL	V20__UPDATE_TABLE_PACKAGE.sql	-603181741	proxydb	2023-01-08 14:54:20.892088	51	t
20	21	UPDATE TABLE TRANSACTION	SQL	V21__UPDATE_TABLE_TRANSACTION.sql	-707927807	proxydb	2023-01-14 08:39:38.126992	36	t
\.

--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: proxydb
--

COPY public.locations (id, name, seq) FROM stdin;
\.

--
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: proxydb
--

COPY public.packages (id, uuid, name, time_unit, duration, price, status, allow_change_ip, allow_change_location, min_time_change_ip, type, location, seq, created_at, updated_at, isp, content) FROM stdin;
11	3b75af5c-9f91-44eb-b6d7-1a8f38a02b40	NL Vodafone Weekly	WEEK	1	20	ACTIVE	1	1	300	MOBILE		5	2022-10-21 08:32:22.622899	2023-01-16 14:40:49.722306	Vodafone	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
12	42a7f707-01e0-4b28-8cac-7a39dfbd331f	NL KPN Weekly	WEEK	1	25	ACTIVE	1	1	300	MOBILE		6	2022-10-21 09:45:58.302189	2023-01-16 14:40:57.617443	KPN mobile	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
8	0c326c1d-8a93-4f1d-af32-78cf2591dd10	NL T-Mobile Monthly	MONTH	1	55	ACTIVE	1	1	300	MOBILE		7	2022-10-11 22:37:26.536114	2023-01-16 14:41:05.396028	T-Mobile	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
6	5b556816-0400-43aa-9479-25e28aecb02d	NL Vodafone Monthly	MONTH	1	55	ACTIVE	1	1	300	MOBILE		8	2022-10-05 11:38:42.843682	2023-01-16 14:41:16.818072	Vodafone	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
10	ae4eee1e-8120-4601-a71a-d2a32d977f72	NL T-mobile Daily	DAY	1	5	ACTIVE	1	1	300	MOBILE		1	2022-10-21 08:31:24.781619	2023-01-16 14:39:56.984791	T-Mobile	<p>✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated</p>\n
5	cb630cac-9f6b-4a08-9001-8bcd2863b5a6	NL Vodafone Daily	DAY	1	5	ACTIVE	1	1	300	MOBILE		2	2022-09-29 13:35:08.083228	2023-01-16 14:40:12.674287	Vodafone	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
13	a95643f7-fb31-4085-93df-fd21ebed5725	NL KPN Daily	DAY	1	6	ACTIVE	1	1	300	MOBILE		3	2022-10-24 15:46:34.469451	2023-01-16 14:40:23.693221	KPN mobile	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
14	83e54d57-48c6-49c8-a272-18a0b9502f87	NL T-mobile Weekly	WEEK	1	20	ACTIVE	1	1	300	MOBILE		4	2022-10-31 10:34:09.840532	2023-01-16 14:40:43.064602	T-Mobile	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
9	7a71feab-b9f2-425e-ab1e-1b97ef14cec4	NL KPN Mobile Monthly	MONTH	1	60	ACTIVE	1	1	300	MOBILE		9	2022-10-12 12:02:43.215584	2023-01-16 14:41:25.027716	KPN mobile	✔ Fast 4G Speeds<br />\n✔ Rotation using API ( 300 seconds )<br />\n✔ Unbeatable IP Reputation<br />\n✔ 10GB daily<br />\n✔ Completely Anonymous<br />\n✔ Fully Dedicated
17	ff8b72dd-e3ee-4837-92d9-2175e9a35f3f	USA T-mobile Daily	DAY	1	5	ACTIVE	1	1	300	MOBILE		10	2023-01-16 14:20:13.089577	2023-01-27 19:19:38.551065	USA T-mobile	✔️ United States Houston Texas<br />\n✔️ Rotation using API ( 300 seconds )<br />\n✔️ Unbeatable IP Reputation<br />\n✔️ Fast 4g &amp; Unlimited data<br />\n✔️ Completely Anonymous<br />\n✔️ Fully Dedicated
18	156daf72-6979-4fa1-8aa9-906ea4dae930	USA T-mobile Weekly	WEEK	1	25	ACTIVE	1	1	300	MOBILE		11	2023-01-16 14:22:00.548072	2023-01-27 19:20:00.295203	USA T-mobile	✔️ United States Houston Texas<br />\n✔️ Rotation using API ( 300 seconds )<br />\n✔️ Unbeatable IP Reputation<br />\n✔️ Fast 4g &amp; Unlimited data<br />\n✔️ Completely Anonymous<br />\n✔️ Fully Dedicated
19	6824f81f-b7bd-453e-966f-18ed758737c9	USA T-mobile Monthly	MONTH	1	90	ACTIVE	1	1	300	MOBILE		12	2023-01-16 14:23:01.115705	2023-01-27 19:20:07.537883	USA T-mobile	✔️ United States Houston Texas<br />\n✔️ Rotation using API ( 300 seconds )<br />\n✔️ Unbeatable IP Reputation<br />\n✔️ Fast 4g &amp; Unlimited data<br />\n✔️ Completely Anonymous<br />\n✔️ Fully Dedicated
\.

--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: proxydb
--

COPY public.refresh_tokens (id, refresh_token, user_id, created_at) FROM stdin;
\.

--
-- Name: configurations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.configurations_id_seq', 13, true);


--
-- Name: licenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.licenses_id_seq', 1413, true);


--
-- Name: modems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.modems_id_seq', 7, true);


--
-- Name: packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.packages_id_seq', 19, true);


--
-- Name: proxys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.proxys_id_seq', 1112, true);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1481, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proxydb
--

SELECT pg_catalog.setval('public.users_id_seq', 241, true);


--
-- Name: configurations configurations_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_pkey PRIMARY KEY (id);


--
-- Name: configurations configurations_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.configurations
    ADD CONSTRAINT configurations_uuid_key UNIQUE (uuid);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: licenses licenses_http_proxy_id_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_http_proxy_id_key UNIQUE (http_proxy_id);


--
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- Name: licenses licenses_sock_proxy_id_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_sock_proxy_id_key UNIQUE (sock_proxy_id);


--
-- Name: licenses licenses_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_uuid_key UNIQUE (uuid);


--
-- Name: modems modems_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.modems
    ADD CONSTRAINT modems_pkey PRIMARY KEY (id);


--
-- Name: modems modems_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.modems
    ADD CONSTRAINT modems_uuid_key UNIQUE (uuid);


--
-- Name: packages packages_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.packages
    ADD CONSTRAINT packages_pkey PRIMARY KEY (id);


--
-- Name: proxys proxys_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.proxys
    ADD CONSTRAINT proxys_pkey PRIMARY KEY (id);


--
-- Name: proxys proxys_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.proxys
    ADD CONSTRAINT proxys_uuid_key UNIQUE (uuid);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_refresh_token_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_refresh_token_key UNIQUE (refresh_token);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_uuid_key UNIQUE (uuid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_uuid_key; Type: CONSTRAINT; Schema: public; Owner: proxydb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_uuid_key UNIQUE (uuid);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: proxydb
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: proxydb
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO proxydb;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

