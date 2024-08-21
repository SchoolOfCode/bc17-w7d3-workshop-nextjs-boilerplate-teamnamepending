
import styles from './HeroDescription.module.css'

const HeroDescription = () => {
    return (
        <div className={styles.heroDescription}>
        <p className={styles.heroHeadline}>
          Discover the <br />
          perfect fireplace ...
        </p>
        <p className={styles.consultationParagraph}>
          Book consultation: <span className={styles.numberSpan}>
          <a href="http://localhost:3000/DesignBooking"><button>Contact Us</button></a></span>
        </p>
      </div>
    )
}

export default HeroDescription