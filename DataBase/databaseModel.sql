/*CREATE DATABASE databaseName;
CREATE EXTENSION postgis;*/

---------------
--Utilisateur--
---------------
CREATE ROLE api LOGIN  ENCRYPTED PASSWORD '******' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;


-------------
--Procedure--
-------------
CREATE OR REPLACE FUNCTION updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

----------
--Tables--
----------
CREATE TABLE public.country(
  id serial,
  name character varying(50) NOT NULL,
  geom geometry(MultiPolygon, 4326) NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT NULL,
  CONSTRAINT country_pk PRIMARY KEY(id),
  CONSTRAINT country_unique UNIQUE(name)
);

CREATE TABLE public.risk(
  id serial,
  name character varying(25) NOT NULL,
  intensity integer NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT NULL,
  CONSTRAINT risk_pk PRIMARY KEY(id),
  CONSTRAINT risk_unique UNIQUE(name)
);

CREATE TABLE public.warning_zone(
  id serial,
  geom geometry(Polygon,4326) NOT NULL,
  risk_type integer NOT NULL,
  risk_intensity integer NOT NULL,
  description character varying(255) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  validation_date date DEFAULT NULL,
  expiration_date date DEFAULT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT NULL,
  CONSTRAINT warning_zone_pk PRIMARY KEY (id),
  CONSTRAINT warning_zone_fk FOREIGN KEY (risk_type) REFERENCES risk(id)
);

CREATE TABLE public.anomaly(
  id serial,
  name character varying(25) NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT NULL,
  CONSTRAINT anomaly_pk PRIMARY KEY(id),
  CONSTRAINT anomaly_unique UNIQUE(name)
);

CREATE TABLE public.anomaly_zone(
  id serial,
  geom geometry(Polygon,4326) NOT NULL,
  anomaly_type integer NOT NULL,
  description character varying(255) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  expiration_date date DEFAULT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT NULL,
  CONSTRAINT anomaly_zone_pk PRIMARY KEY (id),
  CONSTRAINT anomaly_zone_fk FOREIGN KEY (anomaly_type) REFERENCES anomaly(id)
);

CREATE TABLE public.poi_type (
    id serial,
    name text NOT NULL,
    category character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT NULL,
    CONSTRAINT poi_type_pk PRIMARY KEY (id),
    CONSTRAINT poi_type_unique UNIQUE (name)
);

CREATE TABLE public.poi (
    id serial,
    geom geometry(POINT, 4326),
    name character varying(255) NOT NULL,
    poi_type_id integer,
    layer_poi character varying(50) DEFAULT NULL::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT NULL,
    CONSTRAINT poi_pk PRIMARY KEY (id)
);


----------------
--Déclencheurs--
----------------
CREATE TRIGGER country_updated_at BEFORE UPDATE ON public.country FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER risk_updated_at BEFORE UPDATE ON public.risk FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER warning_zone_updated_at BEFORE UPDATE ON public.warning_zone FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER anomaly_updated_at BEFORE UPDATE ON public.anomaly FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER anomaly_zone_updated_at BEFORE UPDATE ON public.anomaly_zone FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER poi_type_updated_at BEFORE UPDATE ON public.poi_type FOR EACH ROW EXECUTE PROCEDURE updated_at_column();
CREATE TRIGGER poi_updated_at BEFORE UPDATE ON public.poi FOR EACH ROW EXECUTE PROCEDURE updated_at_column();


----------
--Droits--
----------
ALTER TABLE public.country OWNER TO postgres;
ALTER TABLE public.warning_zone OWNER TO postgres;
ALTER TABLE public.anomaly_zone OWNER TO postgres;
ALTER TABLE public.risk OWNER TO postgres;
ALTER TABLE public.anomaly OWNER TO postgres;
ALTER TABLE public.poi_type OWNER TO postgres;
ALTER TABLE public.poi OWNER TO postgres;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.country TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.warning_zone TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.anomaly_zone TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.risk TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.anomaly TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.poi_type TO api;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.poi TO api;

GRANT USAGE ON SEQUENCE public.country_id_seq TO api;
GRANT USAGE ON SEQUENCE public.anomaly_id_seq TO api;
GRANT USAGE ON SEQUENCE public.anomaly_zone_id_seq TO api;
GRANT USAGE ON SEQUENCE public.risk_id_seq TO api;
GRANT USAGE ON SEQUENCE public.warning_zone_id_seq TO api;
GRANT USAGE ON SEQUENCE public.poi_type_id_seq TO api;
GRANT USAGE ON SEQUENCE public.poi_id_seq TO api;
