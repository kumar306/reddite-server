import { MigrationInterface, QueryRunner } from "typeorm"

export class DataInsert1703914551204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into POST (title, text, points, "authorId") values ('Killers', 'Distributed next generation adapter', 0, 1);
insert into POST (title, text, points, "authorId") values ('The Floating Castle', 'Diverse cohesive open system', 0, 2);
insert into POST (title, text, points, "authorId") values ('Keys of the Kingdom, The', 'Monitored systemic budgetary management', 0, 1);
insert into POST (title, text, points, "authorId") values ('High Strung', 'Open-source exuding alliance', 0, 3);
insert into POST (title, text, points, "authorId") values ('In Therapy (Divã)', 'Ameliorated 24 hour info-mediaries', 0, 1);
insert into POST (title, text, points, "authorId") values ('Dry Summer (Susuz yaz) (Reflections)', 'Intuitive background parallelism', 0, 3);
insert into POST (title, text, points, "authorId") values ('Telling You', 'Organized grid-enabled solution', 0, 2);
insert into POST (title, text, points, "authorId") values ('Rebirth of Mothra', 'Compatible coherent access', 0, 2);
insert into POST (title, text, points, "authorId") values ('TerrorVision', 'Optional composite portal', 0, 3);
insert into POST (title, text, points, "authorId") values ('Siete minutos (Seven Minutes)', 'Configurable client-driven open system', 0, 2);
insert into POST (title, text, points, "authorId") values ('Scientist, The', 'Customizable optimizing policy', 0, 2);
insert into POST (title, text, points, "authorId") values ('Cantinflas', 'Vision-oriented non-volatile groupware', 0, 3);
insert into POST (title, text, points, "authorId") values ('Bad Blood (Mauvais sang)', 'Programmable motivating database', 0, 2);
insert into POST (title, text, points, "authorId") values ('Jabberwocky', 'Polarised neutral Graphic Interface', 0, 1);
insert into POST (title, text, points, "authorId") values ('Hippie Masala - Forever in India', 'Optimized impactful service-desk', 0, 3);
insert into POST (title, text, points, "authorId") values ('Dead Meat', 'Compatible static orchestration', 0, 3);
insert into POST (title, text, points, "authorId") values ('Joe + Belle', 'Assimilated web-enabled projection', 0, 2);
insert into POST (title, text, points, "authorId") values ('V/H/S/2', 'Customer-focused mission-critical ability', 0, 3);
insert into POST (title, text, points, "authorId") values ('Judas Kiss', 'User-friendly static local area network', 0, 1);
insert into POST (title, text, points, "authorId") values ('Spinning Plates', 'Exclusive zero defect data-warehouse', 0, 3);
insert into POST (title, text, points, "authorId") values ('Mid-August Lunch (Pranzo di ferragosto)', 'Public-key cohesive matrices', 0, 3);
insert into POST (title, text, points, "authorId") values ('Song of the Thin Man', 'Configurable discrete protocol', 0, 1);
insert into POST (title, text, points, "authorId") values ('Iria: Zeiram the Animation ', 'Face to face hybrid complexity', 0, 3);
insert into POST (title, text, points, "authorId") values ('Carpool', 'Multi-tiered didactic hub', 0, 1);
insert into POST (title, text, points, "authorId") values ('Jim Gaffigan: Mr. Universe', 'Re-engineered high-level product', 0, 2);
insert into POST (title, text, points, "authorId") values ('American Ninja 5', 'Horizontal background open architecture', 0, 1);
insert into POST (title, text, points, "authorId") values ('Field of Dreams', 'Synergized background artificial intelligence', 0, 1);
insert into POST (title, text, points, "authorId") values ('Innocence', 'Ameliorated encompassing model', 0, 2);
insert into POST (title, text, points, "authorId") values ('Mother and the Whore, The (Maman et la putain, La)', 'Ergonomic content-based groupware', 0, 3);
insert into POST (title, text, points, "authorId") values ('Last Stand At Saber River', 'Managed fault-tolerant moderator', 0, 1);
insert into POST (title, text, points, "authorId") values ('13/13/13', 'Realigned secondary leverage', 0, 1);
insert into POST (title, text, points, "authorId") values ('Stuck in Love', 'Profit-focused systematic interface', 0, 3);
insert into POST (title, text, points, "authorId") values ('She Gods of Shark Reef', 'Compatible fresh-thinking methodology', 0, 3);
insert into POST (title, text, points, "authorId") values ('Ca$h', 'Business-focused reciprocal task-force', 0, 3);
insert into POST (title, text, points, "authorId") values ('After Fall, Winter', 'Versatile radical conglomeration', 0, 3);
insert into POST (title, text, points, "authorId") values ('Black Dog', 'Exclusive empowering array', 0, 3);
insert into POST (title, text, points, "authorId") values ('All Watched Over by Machines of Loving Grace', 'Re-engineered bifurcated policy', 0, 2);
insert into POST (title, text, points, "authorId") values ('Shall We Dance', 'Optimized actuating support', 0, 1);
insert into POST (title, text, points, "authorId") values ('Patriot, The', 'Integrated real-time hardware', 0, 2);
insert into POST (title, text, points, "authorId") values ('Who Can Kill a Child? (a.k.a. Island of the Damned) (¿Quién puede matar a un niño?)', 'Self-enabling systematic alliance', 0, 3);
insert into POST (title, text, points, "authorId") values ('Patriot Games', 'Open-source dedicated alliance', 0, 2);
insert into POST (title, text, points, "authorId") values ('Dark Angel (I Come in Peace)', 'Up-sized well-modulated frame', 0, 3);
insert into POST (title, text, points, "authorId") values ('Brats, The (Les gamins)', 'Adaptive neutral strategy', 0, 1);
insert into POST (title, text, points, "authorId") values ('Urban Legends: Final Cut', 'Configurable didactic workforce', 0, 3);
insert into POST (title, text, points, "authorId") values ('W.R.: Mysteries of the Organism', 'Face to face exuding function', 0, 2);
insert into POST (title, text, points, "authorId") values ('Visions of Europe', 'Ergonomic full-range ability', 0, 3);
insert into POST (title, text, points, "authorId") values ('Dish & the Spoon, The', 'Balanced actuating project', 0, 2);
insert into POST (title, text, points, "authorId") values ('My Cousin Rachel', 'Pre-emptive optimizing complexity', 0, 3);
insert into POST (title, text, points, "authorId") values ('Good Advice', 'Quality-focused even-keeled initiative', 0, 3);
insert into POST (title, text, points, "authorId") values ('Bothersome Man, The (Brysomme mannen, Den)', 'Profound zero administration website', 0, 1);
insert into POST (title, text, points, "authorId") values ('Dead Bang', 'Focused methodical knowledge user', 0, 2);
insert into POST (title, text, points, "authorId") values ('Lightning Jack', 'Assimilated optimizing challenge', 0, 1);
insert into POST (title, text, points, "authorId") values ('They Were Expendable', 'Enhanced zero tolerance knowledge base', 0, 3);
insert into POST (title, text, points, "authorId") values ('Fortress 2', 'Streamlined content-based flexibility', 0, 3);
insert into POST (title, text, points, "authorId") values ('Graduation Day', 'Digitized directional orchestration', 0, 3);
insert into POST (title, text, points, "authorId") values ('Three Musketeers, The', 'Vision-oriented uniform database', 0, 2);
insert into POST (title, text, points, "authorId") values ('Big Heat, The', 'Upgradable demand-driven hardware', 0, 2);
insert into POST (title, text, points, "authorId") values ('Sounder', 'Public-key interactive functionalities', 0, 2);
insert into POST (title, text, points, "authorId") values ('Monty Python Live (Mostly)', 'Customer-focused multi-tasking challenge', 0, 3);
insert into POST (title, text, points, "authorId") values ('Rulers of the City', 'Configurable executive framework', 0, 1);
insert into POST (title, text, points, "authorId") values ('Student of the Year', 'Visionary transitional orchestration', 0, 3);
insert into POST (title, text, points, "authorId") values ('Dead Snow 2: Red vs. Dead ', 'Adaptive stable array', 0, 2);
insert into POST (title, text, points, "authorId") values ('D.C.H. (Dil Chahta Hai)', 'Multi-layered radical analyzer', 0, 2);
insert into POST (title, text, points, "authorId") values ('Nightmare Alley', 'Decentralized asynchronous project', 0, 2);
insert into POST (title, text, points, "authorId") values ('Bilitis', 'Realigned eco-centric infrastructure', 0, 1);
insert into POST (title, text, points, "authorId") values ('Portrait of Jennie', 'Multi-layered bandwidth-monitored alliance', 0, 2);
insert into POST (title, text, points, "authorId") values ('Wedding Daze', 'Optimized intermediate implementation', 0, 1);
insert into POST (title, text, points, "authorId") values ('Switching Channels', 'Cross-group national success', 0, 3);
insert into POST (title, text, points, "authorId") values ('Casualties of War', 'Focused web-enabled superstructure', 0, 3);
insert into POST (title, text, points, "authorId") values ('When Willie Comes Marching Home', 'User-friendly optimizing leverage', 0, 1);
insert into POST (title, text, points, "authorId") values ('Knuckleball!', 'Focused multi-state capability', 0, 3);
insert into POST (title, text, points, "authorId") values ('My Way Home (Így jöttem) ', 'Extended encompassing benchmark', 0, 3);
insert into POST (title, text, points, "authorId") values ('How the Grinch Stole Christmas (a.k.a. The Grinch)', 'Horizontal real-time initiative', 0, 2);
insert into POST (title, text, points, "authorId") values ('Mille bolle blu', 'Optimized user-facing knowledge user', 0, 3);
insert into POST (title, text, points, "authorId") values ('Knock on Wood', 'Assimilated local strategy', 0, 2);
insert into POST (title, text, points, "authorId") values ('Sentimental Swordsman, The (To ching chien ko wu ching chien)', 'User-friendly 6th generation productivity', 0, 1);
insert into POST (title, text, points, "authorId") values ('Big Business', 'Managed full-range collaboration', 0, 3);
insert into POST (title, text, points, "authorId") values ('Sansa', 'Networked well-modulated knowledge base', 0, 1);
insert into POST (title, text, points, "authorId") values ('Tess of the Storm Country', 'Front-line context-sensitive strategy', 0, 2);
insert into POST (title, text, points, "authorId") values ('Brotherhood, The', 'Team-oriented full-range hardware', 0, 3);
insert into POST (title, text, points, "authorId") values ('Goliath Awaits', 'Cross-group system-worthy approach', 0, 3);
insert into POST (title, text, points, "authorId") values ('Taming the Fire (Ukroshcheniye ognya)', 'Cloned systematic knowledge user', 0, 2);
insert into POST (title, text, points, "authorId") values ('Legend of Bigfoot, The', 'Organic client-driven access', 0, 1);
insert into POST (title, text, points, "authorId") values ('Bran Nue Dae', 'Intuitive global neural-net', 0, 2);
insert into POST (title, text, points, "authorId") values ('Play Time (a.k.a. Playtime)', 'Re-contextualized radical synergy', 0, 1);
insert into POST (title, text, points, "authorId") values ('The Son of the Sheik', 'Face to face maximized archive', 0, 3);
insert into POST (title, text, points, "authorId") values ('Dillinger', 'Profit-focused human-resource frame', 0, 1);
insert into POST (title, text, points, "authorId") values ('Someone Marry Barry', 'Down-sized secondary solution', 0, 3);
insert into POST (title, text, points, "authorId") values ('Siete minutos (Seven Minutes)', 'Sharable scalable instruction set', 0, 1);
insert into POST (title, text, points, "authorId") values ('Sade', 'Extended tertiary portal', 0, 1);
insert into POST (title, text, points, "authorId") values ('Sunset Limited, The', 'Diverse asymmetric interface', 0, 1);
insert into POST (title, text, points, "authorId") values ('Star Trek', 'Profit-focused didactic task-force', 0, 1);
insert into POST (title, text, points, "authorId") values ('Dancing Hawk, The (Tanczacy jastrzab)', 'Self-enabling bifurcated installation', 0, 2);
insert into POST (title, text, points, "authorId") values ('Life Back Then (Antoki no inochi)', 'Compatible impactful hardware', 0, 3);
insert into POST (title, text, points, "authorId") values ('Psycho', 'Assimilated composite collaboration', 0, 2);
insert into POST (title, text, points, "authorId") values ('10 Years', 'Profit-focused transitional solution', 0, 1);
insert into POST (title, text, points, "authorId") values ('In Passing', 'Streamlined exuding local area network', 0, 3);
insert into POST (title, text, points, "authorId") values ('A Summer in La Goulette', 'Business-focused radical data-warehouse', 0, 1);
insert into POST (title, text, points, "authorId") values ('Paper Man', 'Expanded uniform algorithm', 0, 1);
insert into POST (title, text, points, "authorId") values ('Out of Bounds', 'Streamlined holistic installation', 0, 2);
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
