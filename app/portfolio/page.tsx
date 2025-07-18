import Header from "@/components/layout/Header";
import About from "@/components/portfolio/About";
import Experience, {
	PortfolioExperience,
} from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
/**
 * Nền nhạt	bg-blue-50
Viền	border-blue-500
Văn bản	text-blue-800
Hover	hover:bg-blue-100
 * 
 */

export default function Portfolio() {
	const experiences: PortfolioExperience[] = [
		{
			fromTo: "2022 - 2024",
			companyName: "Joyful Ltd Inc.",
			position: "Fullstack Developer",
			description: [
				"Developed and maintained responsive websites using HTML5, CSS3, JavaScript (ES6+), and jQuery",
				"Implemented pixel-perfect UI components from Figma designs",
				"Ensured cross-browser compatibility and responsive layouts using Bootstrap and custom Media queries",
				"Developed interactive features using JavaScript and jQuery AJAX for improved user experience",
				"Integrated websites with backend systems using REST APIs",
				"Collaborated closely with design and sales teams to understand client requirements and deliver solutions",
				"Optimized website performance and fixed bugs to ensure smooth user experience",
				"Assisted in website deployment, domain configuration, and hosting setup",
				"Created weekly progress reports and participated in team planning meetings",
			],
			techStack: ["PHP", "Docker", "ReactJS", "NextJS"],
		},
		{
			fromTo: "2022-2024",
			companyName: "Sikido Media and Advertising Inc.",
			position: "Frontend Developer",
			description: [
				"lorem ipsum His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind. ",
			],
			techStack: ["ES6", "Docker", "ReactJS", "NextJS"],
		},
		{
			fromTo: "2022-2024",
			companyName: "Vien Dong Computer Ltd Inc.",
			position: "Frontend Developer",
			description: [
				"lorem ipsum His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind. ",
			],
			techStack: ["PHP", "Docker", "ReactJS", "NextJS"],
		},
	];
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
	);
}
