import { useState } from 'react';
import styles from '../ClassList/style.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

const anim = {
    initial: { width: 0 },
    open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
    closed: { width: 0 }
};

function ClassCard({ name, img, version, slug }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div onMouseEnter={() => { setIsActive(true); }} onMouseLeave={() => { setIsActive(false); }} className={styles.project}>
            <p>{name}</p>
            <motion.div variants={anim} animate={isActive ? "open" : "closed"} className={styles.imgContainer}>
                <Link href={`/classes/${slug}`}><img src={img} alt={name}></img></Link>
            </motion.div>
            <p className="text-base">{version}</p>
        </div>
    );
}

export default ClassCard;

