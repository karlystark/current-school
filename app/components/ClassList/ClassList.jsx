'use client';
import ClassCard from '../ClassCard/ClassCard';
import styles from './style.module.css';
import classes from '../../classes';

const anim = {
    initial: { width: 0 },
    open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
    closed: { width: 0 }
};

function ClassList() {
    return (
        <main className={`${styles.main} pt-10 pb-20`}>
            <p className="underline decoration-2 decoration-wavy underline-offset-6 pb-8 pl-8">explore classes</p>
            <div className={styles.gallery}>
                {
                    classes.map((classItem, index) => <ClassCard key={index} name={classItem.name} img= {classItem.img} version={classItem.version} slug={classItem.slug}/>)
                }
            </div>
        </main>
    );
}


export default ClassList;