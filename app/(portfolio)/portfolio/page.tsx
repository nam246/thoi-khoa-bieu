import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Experience, { ExperienceType } from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
/**
 * Nền nhạt	bg-blue-50
Viền	border-blue-500
Văn bản	text-blue-800
Hover	hover:bg-blue-100
 * 
 */

export default function Portfolio() {
    const experiences: ExperienceType[] = [
        {
            fromTo: "2022-2024",
            position: "Frontend Developer",
            description: "lorem ipsum His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind. ",
            techStack: [],
        },
        {
            fromTo: "2022-2024",
            position: "Frontend Developer",
            description: "lorem ipsum His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind. ",
            techStack: [],
        },
        {
            fromTo: "2022-2024",
            position: "Frontend Developer",
            description: "lorem ipsum His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind. ",
            techStack: [],
        },
    ]
    return (
        <div className="bg-blue-50 min-h-screen lg:flex lg:justify-between lg:gap-4">
            <div className="flex-1 relative">
                <Header
                    title="Vũ Hoàng Diệu Trung"
                    subtitle="Software Engineer"
                    description="Passionate in building software."
                />
            </div>
            <main id="content" className="py-24 flex-1">
                <About />
                <Experience experiences={experiences} />
                <Skills />
                <Projects />
            </main>
        </div>
    )
}