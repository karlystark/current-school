import Image from 'next/image';
import ClassList from '../components/ClassList/ClassList';
// import ClassCard from '../components/ClassCard/ClassCard';
import Footer from '../components/Footer/Footer';

function About() {
    return (
        <>
        <div className="bg-[#222222] text-[#f3f3f2] flex flex-col items-center">
            <div className="pt-28 w-2/3 flex justify-center">
                <Image src="/birdtree.jpg" className="rounded-md" height="800" width="800" alt="a bird flies from a tree"></Image>
            </div>
            <div className="text-left pt-10 pb-30 w-4/5">
                <p className="text-center text-xl">currents is a diy film school for experimental filmmaking.</p>
                <br></br>
                <p className="text-center pb-10 text-lg">~ classes happen in my living room & sometimes remotely ~</p>
                <br></br>
                <p> about:</p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6"> film as thought, reflection, journey, play. </p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6">low-stakes exploration, lyrical expression, and good conversation.</p>
                <br></br>
                <br></br>
                <p>come:</p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6"> make something you need to make.</p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6">learn some tools so you can bend them. </p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6">figure out what you've been meaning to say. </p>
                <br></br>
                <p className="hover:underline hover:decoration-wavy underline-offset-6 pb-4">run around in circles. </p>
            </div>
        </div>
        <ClassList />
        <Footer />
        </>
    );
}


export default About;