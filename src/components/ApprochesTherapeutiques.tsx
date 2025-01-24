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
        <div className="w-full">
          <h2 className="gradient-title texth2 mb-8">Découvrez nos approches en vidéo</h2>
          <div className="w-full overflow-hidden">
            <VideoSection videos={approchesData.videos} />
          </div>
        </div>
      </section>

      <section className={styles["parallax-methodes"]}>
        <div className={styles["parallax-methodes-content"]}>
          <h2 className="text-center gradient-title mt-5 texth3 mb-8">Les Approches</h2>
          <div className={styles["methodes-grid"]}>
            {approchesFirstRow.map((approche, index) => (
              <div key={index} className={styles["methode-card"]}>
                <div className={styles["methode-title"]}>
                  <h3>{approche.title}</h3>
                </div>
                <div className={styles["methode-content"]}>
                  <div className={styles["methode-image"]}>
                    <Image
                      src={approche.image}
                      alt={approche.title}
                      width={400}
                      height={300}
                      className={styles["image"]}
                    />
                  </div>
                  <div className={styles["methode-description"]}>
                    <p>{approche.description}</p>
                  </div>
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
              <div className={styles["approche-image-container"]}>
                <Image
                  src={approche.image}
                  alt={approche.title}
                  width={300}
                  height={200}
                  className={styles["approche-image"]}
                />
              </div>
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
