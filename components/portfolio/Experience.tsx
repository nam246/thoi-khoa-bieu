import { Badge } from "../ui/badge";

export type PortfolioExperience = {
	fromTo: string;
	companyName: string;
	position: string;
	description: string[];
	techStack: string[];
};

export default function Experience({
	experiences,
}: {
	experiences: PortfolioExperience[];
}) {
	return (
		<section
			id="experience"
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 text-blue-800"
		>
			<h3 className="text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
				Experiences
			</h3>
			<ol>
				<li className="mb-12 text-blue-800 rounded-md">
					<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
						{/* <div className="col-span-2">
                            
                        </div> */}
						<div className="col-span-8">
							<h3 className="font-bold text-2xl">
								Sikido Media and Advertising Inc. | 2022 - 2024
							</h3>
							<p className="font-bold">Frontend Developer</p>
							<ul className="list-disc ml-5">
								<li>
									Developed and maintained responsive websites using HTML5, CSS3,
									JavaScript (ES6+), and jQuery
								</li>
								<li>Implemented pixel-perfect UI components from Figma designs</li>
								<li>
									Ensured cross-browser compatibility and responsive layouts using
									Bootstrap and custom Media queries
								</li>
								<li>
									Developed interactive features using JavaScript and jQuery AJAX for
									improved user experience
								</li>
								<li>Integrated websites with backend systems using REST APIs</li>
								<li>
									Collaborated closely with design and sales teams to understand client
									requirements and deliver solutions
								</li>
								<li>
									Optimized website performance and fixed bugs to ensure smooth user
									experience
								</li>
								<li>
									Assisted in website deployment, domain configuration, and hosting setup
								</li>
								<li>
									Created weekly progress reports and participated in team planning
									meetings
								</li>
							</ul>
							<ul className="flex gap-3">
								<li>
									<Badge className="bg-blue-100 text-blue-800 border-blue-500">
										PHP
									</Badge>
								</li>
								<li>
									<Badge className="bg-blue-100 text-blue-800 border-blue-500">
										ReactJS
									</Badge>
								</li>
								<li>
									<Badge className="bg-blue-100 text-blue-800 border-blue-500">
										Docker
									</Badge>
								</li>
								<li>
									<Badge className="bg-blue-100 text-blue-800 border-blue-500">
										Postman
									</Badge>
								</li>
							</ul>
						</div>
					</div>
				</li>
				{experiences.length > 0
					? experiences.map((ex, index) => (
							<li key={index} className="mb-12 text-blue-800 rounded-md">
								<div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
									<div className="col-span-2">{ex.fromTo}</div>
									<div className="col-span-8">
										<h3 className="font-bold text-2xl">
											{ex.companyName} | {ex.fromTo}
										</h3>
										<p className="font-bold">{ex.position}</p>
										<ul className="list-disc ml-5">
											{ex.description.map((des, dexIndex) => (
												<li key={dexIndex}>{des}</li>
											))}
										</ul>
										<ul className="flex gap-3">
											{ex.techStack.map((tech, techIndex) => (
												<li key={techIndex}>
													<Badge
														key={techIndex}
														className="bg-blue-100 text-blue-800 border-blue-500"
													>
														{tech}
													</Badge>
												</li>
											))}
											<li>
												<Badge className="bg-blue-100 text-blue-800 border-blue-500">
													PHP
												</Badge>
											</li>
											<li>
												<Badge className="bg-blue-100 text-blue-800 border-blue-500">
													ReactJS
												</Badge>
											</li>
											<li>
												<Badge className="bg-blue-100 text-blue-800 border-blue-500">
													Docker
												</Badge>
											</li>
											<li>
												<Badge className="bg-blue-100 text-blue-800 border-blue-500">
													Postman
												</Badge>
											</li>
										</ul>
									</div>
								</div>
							</li>
					  ))
					: ""}
			</ol>
		</section>
	);
}
