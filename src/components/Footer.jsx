import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { CommandLineIcon } from '@heroicons/react/24/solid';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Section */}
        <div className="text-center md:text-left flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              <a href="mailto:nandaomswarup@gmail.com" className="hover:text-blue-400 transition">
                nandaomswarup@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* About Developer */}
        <div className="text-center">
          <CommandLineIcon className="w-10 h-10 mx-auto text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">About the Developer</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto mb-4">
            I'm Omswarup Nanda, passionate about building elegant and useful web applications. Connect with me:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/nandaomswarup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/your-github-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 transition"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right flex flex-col justify-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Omswarup Nanda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
