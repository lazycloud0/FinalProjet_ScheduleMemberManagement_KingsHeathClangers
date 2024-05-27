"use client";
import React from "react";
import styles from "./aboutpage.module.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.about}>
        <h1 className={styles.title}>Who We Are</h1>
        <p className={styles.text}>
          Established in Kings Heath Park in 2020 and formalised into a Club in
          2024, Kings Heath Community Basketball is a collective built on{" "}
          <span className={styles.singleWord}>grit</span>,
          <span className={styles.singleWord}> determination</span> and a desire
          to <span className={styles.singleWord}>win</span> with{" "}
          <span className={styles.singleWord}>integrity</span> in both sport and
          life.
        </p>
      </section>
      <Image
        src="/teamphoto.jpg"
        alt="A team photo of Kings Heath Community Basketball Club Men's Team"
        width={400}
        height={225}
        className={styles.teamPhoto}
        priority
      />
      <section className={styles.mission}>
        <h1 className={styles.title}>Mission</h1>
        <p className={styles.text}>
          Our primary goal is to establish a{" "}
          <span className={styles.singleWord}>strong</span> and{" "}
          <span className={styles.singleWord}>inclusive</span> community
          basketball club with multiple teams across varied age groups, genders,
          and from multiple socio-economic backgrounds. <br /> <br /> By
          fostering a <span className={styles.singleWord}>positive </span>
          and <span className={styles.singleWord}>supportive</span> environment,
          we aim to promote the sport of basketball and its numerous benefits to
          both players and the local community.
        </p>
      </section>
      <section className={styles.philosophy}>
        <h1 className={styles.title}>Philosophy</h1>
        <p className={styles.text}>
          <span className={styles.singleWord}>Ubuntu</span>, meaning I am
          because we are, is the philosphy that provides a powerful,
          community-orientated value for all our members to follow
        </p>
      </section>
      <video src="/khcvideo.mp4" controls className={styles.video}></video>
      <section className={styles.leagues}>
        <h1 className={styles.title}>Achievements</h1>
        <p className={styles.text}>
          Current holders of the{" "}
          <span className={styles.singleWord}>Babe Clay Rosebowl Cup</span> and{" "}
          <span className={styles.singleWord}>
            West Midlands Basketball League Division 3 Champion
          </span>
          , we have exceeded expectations in our{" "}
          <span className={styles.singleWord}>first season</span> and have
          ambitious goals for our Youth, {"Women's"} and {"Men's"} teams.
        </p>
      </section>
      <section className={styles.images}>
        <p className={styles.carousel}>An Image Carousel will go here</p>
      </section>
      <section className={styles.timetable}>
        <h1 className={styles.title}>Timetable</h1>
        <h3 className={styles.timeTableSubtitle}>Mondays:</h3>
        <p className={styles.groups}>Open Scrimmage:</p>
        <p>17:45-19:45 (18+ Only)</p>
        <h3 className={styles.timeTableSubtitle}>Saturdays:</h3>
        <p className={styles.groups}>{"Women's"} Training:</p>
        <p className={styles.time}>12:00-13:00 (Female Coach)</p>
        <p className={styles.groups}>Under {"15's"} Training:</p>{" "}
        <p className={styles.time}>12:00-13:30</p>
        <p className={styles.groups}>{"Men's"} Training:</p>
        <p className={styles.time}>13:00-15:00 (Members Only)</p>
        <p className={styles.groups}>Under {"18's"} Training:</p>{" "}
        <p className={styles.time}>13:30-15:00</p>
        <h3 className={styles.timeTableSubtitle}>Sundays:</h3>
        <p className={styles.groups}>Games:</p>
        <p className={styles.lastTime}>18:00</p>
      </section>
    </div>
  );
}
