import { renderToHtml } from "jsxte";
import { writeFileSync } from "fs";

type CardProps = Parameters<typeof Card>[0];
const cards: {
	experience: CardProps[];
	projects: CardProps[];
} = {
	experience: [
		{
			title: "Frontend Developer",
			place: "Recombee",
			date: "5/2021 - present",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Participated in developing the{" "}
							<a
								href="https://www.recombee.com/admin-ui.html"
								// @ts-expect-error
								rel="noopener noreferrer"
								target="_blank"
								class="link-dark"
							>
								admin web app
							</a>{" "}
							for the AI-powered recommender service{" "}
							<a
								href="https://www.recombee.com/"
								// @ts-expect-error
								rel="noopener noreferrer"
								target="_blank"
								class="link-dark"
							>
								Recombee
							</a>
							.
						</li>
						<li>
							Responsible for major product features such as
							Insights (complex data visualisations) and Catalog
							Feeds (customizable item catalog wizard) as well as
							day-to-day tasks, like bugfixes and smaller
							features.
						</li>
						<li>
							Worked in a team on a product which 1000+ sites and
							apps worldwide use.
						</li>
					</ul>
				</div>
			),
			branch: "work",
			tag: "web dev",
			image: "/src/img/cards/recombee-logo.svg",
		},
		{
			title: "Student",
			place: "Faculty of Information Technology, CTU in Prague",
			date: "2019-2025",
			description: (
				<div class="mb-3">
					<i>Master's degree</i>
					<ul class="mb-2">
						<li>
							Study branch Software Engineering, specialization
							Web Development.
						</li>
						<li>Merit scholarship.</li>
					</ul>
					<i>Bachelor's degree</i>
					<ul>
						<li>
							Study branch Software Engineering, specialization
							Computer Graphics.
						</li>
						<li>
							Highest scholarship (weighted average [1.0,1.1]).
						</li>
						<li>
							Top 1% in coding classes (Programming and
							Algorithmics 1 & 2).
						</li>
					</ul>
				</div>
			),
			branch: "school",
			image: "/src/img/cards/fit-cvut-logo-cs.svg",
		},
		{
			title: "Teaching Assistant",
			place: "Faculty of Information Technology, CTU in Prague",
			date: "9/2022 - 2/2025",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Teaching tutorials of the courses Programming and
							Algoritmics 1 and 2 - basics of programming, clean
							and maintanable code. C and C++, OOP.
						</li>
						<li>
							Responsible for testing and providing feedback for
							programming homeworks' assignments.
						</li>
						<li>
							Reviewing students' code - homework submissions and
							semestral projects - incl. providing feedback and
							grading.
						</li>
					</ul>
				</div>
			),
			branch: "school",
			image: "/src/img/cards/fit-cvut-logo-cs.svg",
		},
		{
			title: "Full Stack Developer",
			place: "PROFIKASA ICT s.r.o. (ČEPOS - Česká potravinářská obchodní a.s.)",
			date: "10/2020 - 4/2021",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Participated in developing a complex inventory
							management and POS system called Profikasa.
						</li>
						<li>
							Worked on small features, bugfixes and tests, both
							on the React frontend and C# backend.
						</li>
					</ul>
				</div>
			),
			branch: "work",
			tag: "web dev",
			image: "/src/img/cards/profikasa.png",
		},
		{
			title: "Web Support / Administrator / Automation Engineer",
			place: "OneClick.Systems s.r.o.",
			date: "5/2018 - 4/2020",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Participated in developing an all-in-one CMS called
							AudienceToolkit.
						</li>
						<li>
							Worked on automation, ease of life scripts, support
							tickets and other miscellaneous work.
						</li>
					</ul>
				</div>
			),
			branch: "work",
			tag: "web dev",
			image: "/src/img/cards/oneclick.svg",
		},
		{
			title: "Intern",
			place: "Tatra Banka",
			date: "8/2019",
			description: `Design sprint in the Elevator Lab R&D department, focused on improving financial literacy of the youngest clients.<br/>Invited after winning the Hack Kosice 2019 hackathon in Tatra Banka's category.`,
			branch: "work",
			tag: "web dev",
			image: "/src/img/cards/tatra_banka.svg",
		},
	],
	projects: [
		{
			title: "Evershift",
			date: "11/2023",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							An adventure game with a unique twist - you become
							your enemies!
						</li>
						<li>
							Winner of FIT CTU GameHack 2023 & Warhorse Studios
							price winner.
						</li>
						<li>
							Created in 48 hours with the themes "Mirrors",
							"Curse", "Eclipse" and "New world".
						</li>
					</ul>
					<p>
						<a
							href="https://itch.io/jam/gamehack-fit/rate/2375223"
							class="link-dark"
							target="_blank"
						>
							Jam entry
						</a>
					</p>
					<p>
						<a
							href="https://mravenisko.itch.io/evershift"
							target="_blank"
							class="link-dark"
						>
							Play online
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "game dev",
			image: "/src/img/cards/evershift.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "ChatHuman",
			date: "7/2023",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Text adventure where instead of you prompting
							generative AI, AI prompts you.
						</li>
						<li>
							Created in 48 hours for the GMTK Game Jam 2023 with
							the theme "Roles reversed".
						</li>
						<li>
							Placed 203rd out of 6900 games and 90th in
							creativity.
						</li>
					</ul>
					<p>
						<a
							href="https://itch.io/jam/gmtk-2023/rate/2154610"
							class="link-dark"
							target="_blank"
						>
							Jam entry
						</a>
					</p>
					<p>
						<a
							href="https://mravenisko.itch.io/chathuman"
							target="_blank"
							class="link-dark"
						>
							Play online
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "game dev",
			image: "/src/img/cards/chathuman.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Comicraft",
			date: "4/2023",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Platform for generating AI-generated comics,
							complete with dialogue and images, based on a simple
							text prompt.
						</li>
						<li>
							Created in 24 hours for the Hack Kosice 2023
							Hackathon
						</li>
					</ul>
					<p>
						<a
							href="https://devpost.com/software/deutsche-telekom-comics"
							target="_blank"
							class="link-dark"
						>
							Devpost
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "web dev",
			image: "/src/img/cards/storiesy.jpg",
			imageStyle:
				"max-width: 300px; max-height: 300px; box-shadow: 0 0 5px 0 rgba(0,0,0,0.5)",
			openableImage: true,
		},
		{
			title: "Salaš Simulator VR",
			date: "9/2022 - 12/2022",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Virtual reality interactive scene where you play as
							the owner of a traditional Slovak farm house -
							<a
								href="https://en.wikipedia.org/wiki/Sala%C5%A1"
								class="link-dark"
								target="_blank"
							>
								Salaš
							</a>
							.
						</li>
						<li>
							Created as a semestral project for the courses
							Advanced Virtual Reality and Creative Coding and
							Computational Art.
						</li>
					</ul>
					<p>
						<a
							href="https://ni-ccc.github.io/projects/salas_simulator/"
							target="_blank"
							class="link-dark"
						>
							Project page
						</a>
					</p>
				</div>
			),
			branch: "school",
			tag: "game dev",
			image: "/src/img/cards/salassimulator.jpg",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Rhune",
			date: "11/2022",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>Rhythm-based tower defense game.</li>
						<li>
							Created in 48 hours for the FIT CTU Game Jam 2022.2
							with the theme ingredients "Genius Loci", "Runes",
							"Remote" and "Zero".
						</li>
						<li>
							Placed 3rd overall by the number of itch.io votes.
						</li>
					</ul>
					<p>
						<a
							href="https://itch.io/jam/gamejam-fit-2022-2/rate/1779604"
							target="_blank"
							class="link-dark"
						>
							Jam entry
						</a>
					</p>
					<p>
						<a
							href="https://mravenisko.itch.io/rhune"
							target="_blank"
							class="link-dark"
						>
							Play online
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "game dev",
			image: "/src/img/cards/rhune.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Voxel game engine",
			date: "9/2021 - 6/2022",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Bachelor's thesis with the title "Design and
							implementation of a voxel engine"
						</li>
						<li>
							Analysed and implemented techniques like greedy
							meshing and procedural generation.
						</li>
					</ul>
					<p>
						<a
							href="https://dspace.cvut.cz/handle/10467/101629"
							target="_blank"
							class="link-dark"
						>
							Project page
						</a>
					</p>
				</div>
			),
			branch: "school",
			tag: "game dev",
			image: "/src/img/cards/voxelengine.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Hatenot",
			date: "4/2022",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Hate speech AI detection - machine learning model,
							demo integration (SaaS) and browser extension (for
							Twitter).
						</li>
						<li>
							Created in 24 hours for the Hack Kosice 2022
							Hackathon
						</li>
						<li>
							Winner of Best Hack for Social Good MLH Challenge &
							2nd place Deutsche Telekom Hatemeter Challenge
						</li>
					</ul>
					<p>
						<a
							href="https://devpost.com/software/antihateasy"
							target="_blank"
							class="link-dark"
						>
							Devpost
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "web dev",
			image: "/src/img/cards/hatenot.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Old web portfolio",
			date: "2019 - 2021",
			description: (
				<div class="mb-3">
					My first public web portfolio, originally created in 2019 -{" "}
					<a href="/v1/" target="_blank" class="link-dark">
						link
					</a>
				</div>
			),
			branch: "personal",
			tag: "game dev",
		},
		{
			title: "Messy Jessie",
			date: "7/2020",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Simple arcade game where you tidy up a room after
							your angry daughter.
						</li>
						<li>
							Created in 48 hours for the GMTK Game Jam 2020 with
							the theme "Out of control".
						</li>
					</ul>
					<p>
						<a
							href="https://itch.io/jam/gmtk-2020/rate/700130"
							target="_blank"
							class="link-dark"
						>
							Jam entry
						</a>
					</p>
					<p>
						<a
							href="https://mravenisko.itch.io/messy-jessie"
							target="_blank"
							class="link-dark"
						>
							Play online
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "game dev",
			image: "/src/img/cards/messyjessie.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Spellguard",
			date: "4/2020 - 6/2020",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>Role-playing card game.</li>
						<li>
							Created as a semestral project for the course
							Programming and Algorithmics 2.
						</li>
						<li>
							Explored interesting advanced game development
							concepts like bytecode/custom VM (card behaviour)
							and AI.
						</li>
					</ul>
					<p>
						<a
							href="https://mravenisko.itch.io/spellguard"
							target="_blank"
							class="link-dark"
						>
							Game page
						</a>
					</p>
				</div>
			),
			branch: "school",
			tag: "game dev",
			image: "/src/img/cards/spellguard.png",
			imageStyle: "max-width: 300px; max-height: 300px",
			openableImage: true,
		},
		{
			title: "Moneasy",
			date: "3/2019",
			description: (
				<div class="mb-3">
					<ul class="mb-2">
						<li>
							Spending report app proof-of-concept for children
							with a focus on improving financial literacy.
						</li>
						<li>
							Created in 24 hours for the Hack Kosice 2019
							Hackathon.
						</li>
						<li>
							1st place in Tatra Banka's UX/UI Money Management
							Challenge.
						</li>
					</ul>
					<p>
						<a
							href="https://devpost.com/software/moneasy"
							target="_blank"
							class="link-dark"
						>
							Devpost
						</a>
					</p>
				</div>
			),
			branch: "personal",
			tag: "web dev",
		},
	],
};

const App = `
<!DOCTYPE html>
<html lang="en-us">

<head>
    <meta charset="utf-8">
    <title>Daniel Breiner</title>
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Meta tags -->
    <meta name="title" content="Daniel Breiner - personal portfolio website">
    <meta name="description"
        content="Personal website of a computer science student, a programming enthusiast. Information about me, my past projects and my social media.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://danielbreiner.eu/">
    <meta property="og:title" content="Daniel Breiner - personal porfolio website">
    <meta property="og:description"
        content="Personal website of a computer science student, a programming enthusiast. Information about me, my past projects and my social media.">
    <meta property="og:image" content="https://danielbreiner.eu/src/img/me512.png">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://danielbreiner.eu/">
    <meta property="twitter:title" content="Daniel Breiner - personal portfolio website">
    <meta property="twitter:description"
        content="Personal website of a computer science student, a programming enthusiast. Information about me, my past projects and my social media.">
    <meta property="twitter:image" content="https://danielbreiner.eu/src/img/me512.png">
    <!-- Other -->
    <meta name="theme-color" content="#343a40">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Daniel Breiner">
    <link rel="apple-touch-icon" href="/src/img/me192.png">
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/src/css/main.css">
    <link rel="stylesheet" href="/src/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css"
        integrity="sha384-rtJEYb85SiYWgfpCr0jn174XgJTn4rptSOQsMroFBPQSGLdOC5IbubP6lJ35qoM9" crossorigin="anonymous"> -->
    <!-- Some of the icons used are from Font Awesome 5 Solid: Author: Dave Gandy; License: CC BY 4.0; Original: https://fontawesome.com; License: https://creativecommons.org/licenses/by/4.0/; No changes made; -->
</head>

<body class="text-dark bg-dark">
    <script>
        var galleryLoaded = false;
        function loadGallery() {
            if (galleryLoaded) {
                return;
            }

            var srcs = {
                "poster-book": "/src/img/design_gallery/burza_knih_2017.jpg",
                "poster-upside": "/src/img/design_gallery/den_naopak_2017_v2.png",
                "poster-election": "/src/img/design_gallery/kandiduj_do_zsr_v2.png",
                "poster-ball": "/src/img/design_gallery/plagat_ples1718.png"
            };

            for (const el in srcs) {
                document.getElementById(el).src = srcs[el];
            }

            galleryLoaded = true;
        }
    </script>

    <div id="intro" class="pt-3 d-flex justify-content-center bg-white">
        <div class="p-5">
            <div class="ml-5">
                <h1 class="mb-3 display-4">Hi. I'm <b>Daniel Breiner</b></h1>
                <h3 class="mb-4">Student of Software Engineering. Programmer.</h3>
            </div>
        </div>
    </div>

    <div class="divider bg-light"></div>

    <div id="about" class="bg-light">
       <div class="container py-4">
       <h2 class="mb-4">Experience</h3>
         ${cards.experience
				.map((card) => renderToHtml(<Card {...card} />))
				.join("")}
       </div>
       <div class="container py-4">
       <h2 class="mb-4">Projects</h3>
         ${cards.projects
				.map((card) => renderToHtml(<Card {...card} />))
				.join("")}
       </div>
    </div>

    <div id="footer" class="bg-dark text-light">
        <div class="container">
            <h3 class="text-center py-2 mb-4">Contact</h3>
            <form id="contact" class="mb-5">
                <div class="row mb-4">
                    <div class="col">
                        <label for="name">Name</label>
                        <input class="form-control bg-transparent text-light" type="text" name="name" required
                            aria-label="name">
                    </div>
                    <div class="col">
                        <label for="email">Email</label>
                        <input class="form-control bg-transparent text-light" type="email" name="email" required
                            aria-label="email">
                    </div>
                </div>
                <textarea class="form-control mb-4 bg-transparent text-light" name="message" onfocus="this.value = '';"
                    onblur="if (this.value == '') {this.value = 'Message...';}" required
                    aria-label="message">Message...</textarea>
                <button class="btn btn-light bg-transparent text-light" type="submit" id="submit">
                    <span id="submitSpinner" class="spinner-border-sm" role="status" aria-hidden="true"></span>
                    Send Message
                </button>
            </form>
            <span id="social">
                <ul class="py-4 mb-4 px-0">
                    <li class="linkedin"><a href="https://www.linkedin.com/in/daniel-breiner/" target="_blank"
                            rel="noopener noreferrer" title="https://www.linkedin.com/in/daniel-breiner/"
                            aria-label="Check out my LinkedIn">
                            <img src="/src/img/icons/linkedin.svg" alt="LinkedIn">
                        </a>
                    </li>
                    <li class="devpost"><a href="https://devpost.com/DanielBreiner" target="_blank"
                            rel="noopener noreferrer" title="https://devpost.com/DanielBreiner"
                            aria-label="Check out my Devpost">
                            <img src="/src/img/icons/devpost.svg" alt="Devpost">
                        </a>
                    </li>
                    <li class="github">
                        <a href="https://github.com/DanielBreiner" target="_blank" rel="noopener noreferrer"
                            title="https://github.com/DanielBreiner" aria-label="Check out my Github">
                            <img src="/src/img/icons/github.svg" alt="Github">
                        </a>
                    </li>
                </ul>
            </span>
            <hr class="w-50 gray mb-4 mx-auto">
            <span id="copyright" class="text-light">
                <p class="mb-2">You can also contact me on:<br>
                    <a href="mailto:contact@danielbreiner.eu" class="text-light">contact@danielbreiner.eu</a>
                </p>
                <p>© <span id="copyright-date"></span> Daniel Breiner</p>
            </span>
        </div>
    </div>
</body>

<script type="text/javascript">
    const submitSpinner = document.getElementById("submitSpinner");
    const submitButton = document.getElementById("submit");
    const form = document.getElementById("contact");
    form.addEventListener("submit", onSubmit);

    function onSubmit(e) {
        e.preventDefault();
        submitSpinner.classList.add("spinner-border");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    submitSpinner.classList.remove("spinner-border");
                    submitSpinner.classList.add("success");
                    form.reset();
                    submitButton.disabled = true;
                }
            }
        }
        xhr.open("POST", "https://mailer.danielbreiner.eu/portfolio");
        xhr.send(formToJSON(form));
    }

    function formToJSON(form) {
        var obj = {};
        var elements = form.querySelectorAll("input, textarea");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }
        obj["doNotTrack"] = navigator.doNotTrack;
        if (!navigator.doNotTrack) {
            obj["date"] = new Date();
            obj["timezone"] = new Date().getTimezoneOffset();
            obj["language"] = navigator.language;
            obj["platform"] = navigator.platform;
            obj["userAgent"] = navigator.userAgent;
            obj["screenSize"] = screen.width + "x" + screen.height;
            obj["windowSize"] = innerWidth + "x" + innerHeight;
        }
        return JSON.stringify(obj);
    }
</script>

<script>
    document.getElementById("copyright-date").innerHTML = \`2019 - \${new Date().getFullYear()}\`;
</script>

</html>
`;

function Card({
	date,
	description,
	place,
	title,
	branch,
	tag,
	image,
	subimage,
	imageStyle,
	openableImage,
}: {
	title: string;
	place?: string;
	date: string;
	description: JSXTE.ElementChildren;
	branch?: string;
	tag?: string;
	image?: string;
	subimage?: string;
	imageStyle?: string;
	openableImage?: boolean;
}) {
	return (
		<div class="card mb-3">
			<div class="row g-4">
				<div class="col-md-9 d-flex">
					<div class="card-body d-flex flex-column justify-content-between">
						<div>
							<h5 class="card-title fw-semibold">{title}</h5>

							<p class="card-text d-flex flex-column gap-2 mb-2 fw-medium">
								{place}
								<small class="text-body-secondary d-flex align-items-center gap-2">
									{date}
								</small>
							</p>
							<p class="card-text mb-2">{description}</p>
						</div>
						<div>
							<p class="card-text d-flex gap-3">
								{branch && (
									<small class="text-body-secondary d-flex align-items-center gap-2">
										<svg
											// @ts-ignore
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 0 24 24"
											width="20px"
											fill="#000000"
										>
											{/* @ts-ignore */}
											<path
												d="M0 0h24v24H0z"
												fill="none"
											/>
											{/* @ts-ignore */}
											<path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
										</svg>{" "}
										{branch}
									</small>
								)}
								{tag && (
									<small class="text-body-secondary d-flex align-items-center gap-2">
										<svg
											// @ts-ignore
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 0 24 24"
											width="20px"
											fill="#000000"
										>
											{/* @ts-ignore */}
											<path
												d="M0 0h24v24H0z"
												fill="none"
											/>
											{/* @ts-ignore */}
											<path d="m21.41 11.58-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
										</svg>{" "}
										{tag}
									</small>
								)}
							</p>
						</div>
					</div>
				</div>
				{image && (
					<div class="col-md-3 p-4 px-5 d-flex flex-column justify-content-between align-items-end">
						{openableImage ? (
							<a href={image} target="_blank">
								<img
									src={image}
									class="img-fluid "
									alt="..."
									style={`max-height:100px;max-width: 200px;${imageStyle}`}
								/>
							</a>
						) : (
							<img
								src={image}
								class="img-fluid "
								alt="..."
								style={`max-height:100px;max-width: 200px;${imageStyle}`}
							/>
						)}
						<div>{subimage}</div>
					</div>
				)}
			</div>
		</div>
	);
}

writeFileSync("v2/index.html", App);
