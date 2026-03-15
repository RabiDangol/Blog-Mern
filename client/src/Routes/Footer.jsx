// import React from "react";
// import { Footer } from "flowbite-react";
// import { Link } from "react-router-dom";
// import {
//   BsFacebook,
//   BsInstagram,
//   BsTwitter,
//   BsGithub,
//   BsTwitch,
// } from "react-icons/bs";

// export default function Footers() {
//   return (
//     <Footer container className="border border-t-8 border-teal-500">
//       <div className="w-full max-w-7xl mx-auto">
//         <div className="grid w-full justify-between sm:flex md:grid-cols-1">
//           <div className="mt-5">
//             <Link
//               to="/"
//               className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
//             >
//               <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
//                 Rabee's
//               </span>
//               Blog
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
//             <div>
//               <Footer.Title title="About" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="https://www.100jsprojects.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   100 JS Projects
//                 </Footer.Link>
//                 <Footer.Link
//                   href="/about"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Rabi's Blog
//                 </Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Follow us" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="https://www.github.com/RabiDangol"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Github
//                 </Footer.Link>
//                 <Footer.Link href="#">Discord</Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Legal" />
//               <Footer.LinkGroup col>
//                 <Footer.Link href="#">Privacy Policy</Footer.Link>
//                 <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//           </div>
//         </div>
//         <Footer.Divider />
//         <div className="w-full sm:flex sm:items-center sm:justify-between">
//           <Footer.Copyright
//             href="#"
//             by="Rabee's blog"
//             year={new Date().getFullYear()}
//           />
//           <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
//             <Footer.Icon href="#" icon={BsFacebook} />
//             <Footer.Icon href="#" icon={BsInstagram} />
//             <Footer.Icon href="#" icon={BsTwitch} />
//             <Footer.Icon href="#" icon={BsGithub} />
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// }

import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsTwitch,
} from "react-icons/bs";

export default function Footers() {
  return (
    <footer className="border-t-8 border-teal-500 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-lg sm:text-xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
              Rabee's
            </span>{" "}
            Blog
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
          <div>
            <h5 className="font-semibold mb-2">About</h5>
            <ul>
              <li>
                <a
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </a>
              </li>
              <li>
                <Link to="/about">Rabi's Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Follow us</h5>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href="https://github.com/RabiDangol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a href="#">Discord</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Legal</h5>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} Rabee's blog</p>
          <div className="flex gap-4">
            <BsFacebook />
            <BsInstagram />
            <BsTwitch />
            <BsGithub />
          </div>
        </div>
      </div>
    </footer>
  );
}
