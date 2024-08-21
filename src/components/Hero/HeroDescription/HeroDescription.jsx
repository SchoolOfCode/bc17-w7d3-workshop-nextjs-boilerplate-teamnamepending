import Link from 'next/link';
import styles from './HeroDescription.module.css';

const HeroDescription = () => {
    return (
        <div className={styles.heroDescription}>
            <p className={styles.heroHeadline}>
                Discover the <br />
                perfect fireplace ...
            </p>
            <p className={styles.consultationParagraph}>
                Book consultation: 
                <span className={styles.numberSpan}>
                    <Link href="/DesignBooking">
                        <button>Contact Us</button>
                    </Link>
                </span>
            </p>
        </div>
    )
}

export default HeroDescription;