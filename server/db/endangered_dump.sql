--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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
-- Name: scientists; Type: TABLE; Schema: public; Owner: tpl522_6
--

CREATE TABLE public.scientists (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    expertise character varying(50),
    species_id integer
);


ALTER TABLE public.scientists OWNER TO tpl522_6;

--
-- Name: scientists_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_6
--

CREATE SEQUENCE public.scientists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scientists_id_seq OWNER TO tpl522_6;

--
-- Name: scientists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_6
--

ALTER SEQUENCE public.scientists_id_seq OWNED BY public.scientists.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: tpl522_6
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    species_id integer,
    sighting_date date,
    location character varying(100),
    notes text,
    photo_url character varying(255)
);


ALTER TABLE public.sightings OWNER TO tpl522_6;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_6
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO tpl522_6;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_6
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: tpl522_6
--

CREATE TABLE public.species (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    population_estimate integer
);


ALTER TABLE public.species OWNER TO tpl522_6;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_6
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO tpl522_6;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_6
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: scientists id; Type: DEFAULT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.scientists ALTER COLUMN id SET DEFAULT nextval('public.scientists_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: scientists; Type: TABLE DATA; Schema: public; Owner: tpl522_6
--

COPY public.scientists (id, name, expertise, species_id) FROM stdin;
1	Dr. Alice True	Anthropology	1
2	Dr. Bob Realman	Sociology	1
3	Dr. Carrie Cuddler	Zoology	2
4	Dr. Dan Furfriend	Ecology	2
5	Dr. Emma Buzz	Entomology	3
6	Dr. Finn Flyer	Botany	3
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: tpl522_6
--

COPY public.sightings (id, species_id, sighting_date, location, notes, photo_url) FROM stdin;
1	1	2024-10-25	Remote Island	Observed a small group of authentic humans gathering near the coast.	https://drive.google.com/uc?export=view&id=1a2b3c4d5e
2	1	2024-11-01	Hidden Valley	Spotted an individual attempting to blend in with technology.	https://drive.google.com/uc?export=view&id=2b3c4d5e6f
3	2	2024-10-20	Forest Reserve	A cuddly mammal was spotted near a stream.	https://drive.google.com/uc?export=view&id=3c4d5e6f7g
4	2	2024-10-30	Mountainous Region	Two cuddly mammals seen migrating to a safer area.	https://drive.google.com/uc?export=view&id=4d5e6f7g8h
5	3	2024-10-18	Farmland	A swarm of necessary insects aiding in pollination.	https://drive.google.com/uc?export=view&id=5e6f7g8h9i
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: tpl522_6
--

COPY public.species (id, name, description, population_estimate) FROM stdin;
1	authentic_humans	A rare and endangered species representing the remaining genuine, authentic humans.	5000
2	cuddly_mammals	Endearing mammals at risk of extinction due to habitat loss and climate change.	1200
3	necessary_insects	Insects essential for pollination and ecosystem balance.	300000
\.


--
-- Name: scientists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_6
--

SELECT pg_catalog.setval('public.scientists_id_seq', 6, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_6
--

SELECT pg_catalog.setval('public.sightings_id_seq', 5, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_6
--

SELECT pg_catalog.setval('public.species_id_seq', 3, true);


--
-- Name: scientists scientists_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.scientists
    ADD CONSTRAINT scientists_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: scientists scientists_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.scientists
    ADD CONSTRAINT scientists_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_6
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- PostgreSQL database dump complete
--

