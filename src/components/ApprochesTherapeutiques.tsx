import Image from "next/image";
import styles from "./approches-therapeutiques.module.css";
import {
  approchesFirstRow,
  approchesSecondRow,
  approchesData
} from "../data/approchesData";
import VideoSection from "./VideoSection";

const ApprochesTherapeutiques = () => {
  return (
    <div className={styles.container}>
      <section className={styles.parallax} id="approches">
        <h1 className="text-center gradient-title texth1">Approches Thérapeutiques</h1>
      </section>

      <section className={styles["video-section"]} id="videos">
        <h2 className="gradient-title texth2">Découvrez nos approches en vidéo</h2>
        <VideoSection videos={approchesData.videos} />
      </section>

      <section className={styles["parallax-methodes"]}>
        <div className={styles["parallax-methodes-content"]}>
          <h2 className="text-center gradient-title mt-5 texth3">Les Approches</h2>
          <div className={styles["methodes-grid"]}>
            {approchesFirstRow.map((approche, index) => (
              <div key={index} className={styles["methode-card"]}>
                <Image
                  src={approche.image}
                  alt={approche.title}
                  width={300}
                  height={200}
                  className={styles["methode-image"]}
                />
                <div className={styles["methode-content"]}>
                   <h3>{approche.title}</h3>
                <p>{approche.description}</p>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["approches-container"]}>
        <div className={styles["approches-grid"]}>
          {approchesSecondRow.map((approche, index) => (
            <div key={index} className={styles["approche-item"]}>
              <Image
                src={approche.image}
                alt={approche.title}
                width={300}
                height={200}
                className={styles["approche-image"]}
              />
              <h3>{approche.title}</h3>
              <p>{approche.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ApprochesTherapeutiques;
