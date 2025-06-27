import Link from "next/link"

export default function Header(
    { title, subtitle, description }: { title: string, subtitle: string, description: string }
) {
    return (
        <header className="fixed">
            <div className="py-24 text-blue-800">
                <h1 className="text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
                    <Link href="" className="text-blue-800">{title}</Link>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-blue-800 sm:text-5xl">
                    {subtitle}
                </h2>
                <p className="mt-4 max-w-xs leading-normal">{description}</p>
                <nav className="mt-4">
                    <ul>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#experience">Experience</Link></li>
                        <li><Link href="#projects">Projects</Link></li>
                        <li><Link href="#skills">Skills</Link></li>
                    </ul>
                </nav>
            </div>
            <ul className="ml-1 mt-8 flex items-center text-blue-800" aria-label="Social media">
                <li>
                    <Link href="https://github.com/nam246">
                        <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                            <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link href="https://www.linkedin.com/in/vuhoangtrung/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                    </Link>
                </li>
            </ul>
        </header>
    )
}