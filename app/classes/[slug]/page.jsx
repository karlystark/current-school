import classes from '../../classes';
import Link from 'next/link';

export default function ClassDetailPage({ params }) {
    const { slug } = params;

    // Find the class by slug
    const classData = classes.find(c => c.slug === slug);

    // Handle case where class is not found
    if (!classData) {
        return <div>Class not found</div>;
    }

    return (
        <main className="max-w-4xl mx-auto p-8 pt-30">
            <h1 className="text-3xl font-bold mb-4">{classData.name}</h1>
            <p className="text-lg mb-4">{classData.version}</p>
            <img src={classData.img} alt={classData.name} className="w-full h-64 object-cover mb-6 object-center" />
            <p>{classData.description}</p>
            {classData.instructor && <p>instructor: {classData.instructor}</p>}
            <br></br>
            {classData.longDescription && <p>{classData.longDescription}</p>}
            <br></br>
            <p>{classData.length}</p>
            <p>{classData.schedule}</p>
            <p>{classData.location}</p>
            <br></br>
            <br></br>
            <p>{classData.price}</p>
            <br></br>
            <br></br>
            <div className="flex justify-end">
            <Link href="/about" className="text-xl hover:underline hover:decoration-wavy hover:cursor-pointer">back</Link>
            </div>
        </main>
    );
}

// Optional: Generate metadata for each page
export function generateMetadata({ params }) {
    const { slug } = params;
    const classData = classes.find(c => c.slug === slug);

    return {
        title: classData ? classData.name : 'Class Not Found',
        description: classData?.description || 'Class details'
    };
}