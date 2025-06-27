export default function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-0">
			<main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-16">
				<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
					Chào mừng đến với <span className="text-purple-600">MyTKB</span>
				</h1>
				<p className="text-lg sm:text-xl text-gray-600 mb-10 text-center max-w-xl">
					Chỗ để quản lý portfolio và thời khóa biểu của tôi.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
					<a
						href="/portfolio"
						className="group bg-white/80 hover:bg-purple-50 border border-purple-200 rounded-xl shadow-lg p-8 flex flex-col items-center transition-all duration-200 hover:scale-105"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="text-2xl font-semibold text-purple-700 mb-2 group-hover:underline">
							Portfolio
						</span>
						<span className="text-gray-500 text-center">
							Xem thông tin cá nhân, kỹ năng, dự án và kinh nghiệm của tôi.
						</span>
					</a>
					<a
						href="/tkb"
						className="group bg-white/80 hover:bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-8 flex flex-col items-center transition-all duration-200 hover:scale-105"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="text-2xl font-semibold text-blue-700 mb-2 group-hover:underline">
							Thời khóa biểu
						</span>
						<span className="text-gray-500 text-center">
							Chỗ này xem thời khóa biểu.
						</span>
					</a>
				</div>
			</main>
			<footer className="w-full py-6 flex flex-col items-center gap-2 text-gray-400 text-sm border-t bg-white/60 mt-8">
				<span>© {new Date().getFullYear()} NextJS TKB. All rights reserved.</span>
				<span>
					Made with <span className="text-pink-500">♥</span> by{" "}
					<a href="/portfolio" className="text-purple-600 hover:underline">
						Trung
					</a>
				</span>
			</footer>
		</div>
	);
}
