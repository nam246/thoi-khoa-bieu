export default function Projects() {

    return (
        <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 text-blue-800">
            <h3 className="text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">Projects</h3>
            <ol className="text-blue-800 flex flex-col gap-4">
                <li>
                    <h3 className="text-2xl font-bold mb-1">E-commerce Website Redesign</h3>
                    <ul className="list-disc ml-5">
                        <li>Rebuilt the front-end interface of an existing e-commerce platform</li>
                        <li>Implemented responsive design using Bootstrap and custom CSS</li>
                        <li>Created interactive product galleries and filtering systems with JavaScript</li>
                        <li>Integrated with backend API for product catalog and user authentication</li>
                    </ul>
                </li>
                <li>
                    <h3 className="text-2xl font-bold mb-1">Corporate Website Development</h3>
                    <ul className="list-disc ml-5">
                        <li>Developed a corporate website from Figma designs</li>
                        <li>Implemented responsive layouts for desktop, tablet, and mobile devices</li>
                        <li>Created custom animations and transitions using CSS and JavaScript</li>
                        <li>Integrated contact forms with backend services</li>
                    </ul>
                </li>
            </ol>
        </section>
    )
}