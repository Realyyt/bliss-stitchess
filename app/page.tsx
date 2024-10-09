'use client'

import Image from 'next/image'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Scissors, Shirt, Ruler , Star, Menu, X } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'three'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
}

const projects: Project[] = [
  {
    title: "Classy Modern Styles",
    description: "Tailored to perfection for your unique style.",
    image: "/5.jpeg",
    technologies: ["Wool", "Silk", "Cotton"]
  },
  {
    title: "Traditional Attire",
    description: "Elegant Nigerian designs with a modern twist.",
    image: "/4.jpeg",
    technologies: ["Ankara", "Aso Oke", "Lace"]
  },
  {
    title: "Custom Shirts",
    description: "Perfectly fitted shirts for every occasion.",
    image: "/3.jpeg",
    technologies: ["Egyptian Cotton", "Linen", "Oxford Cloth"]
  },
  // Add more projects as needed
]

export default function HomePage() {
  const creationsRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const setupCarousel = (ref: React.RefObject<HTMLDivElement>, images: string[]) => {
      if (typeof window !== 'undefined' && ref.current) {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, ref.current.clientWidth / ref.current.clientHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        ref.current.appendChild(renderer.domElement)

        const textureLoader = new TextureLoader()
        const textures = images.map(path => textureLoader.load(path))

        const radius = 3
        const imageGroup = new THREE.Group()
        textures.forEach((texture, index) => {
          const angle = (index / textures.length) * Math.PI * 2
          const geometry = new THREE.PlaneGeometry(2, 2.5)
          const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
          const plane = new THREE.Mesh(geometry, material)
          plane.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          )
          plane.lookAt(0, 0, 0)
          imageGroup.add(plane)
        })
        scene.add(imageGroup)

        camera.position.z = 6

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5

        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
          if (ref.current) {
            camera.aspect = ref.current.clientWidth / ref.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
          }
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          ref.current?.removeChild(renderer.domElement)
        }
      }
    }

    setupCarousel(creationsRef, [
      '/tailored-suit-1.jpg',
      '/tailored-dress-1.jpg',
      '/tailored-shirt-1.jpg',
      '/tailored-suit-2.jpg',
      '/tailored-dress-2.jpg',
      '/tailored-shirt-2.jpg',
    ])
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className={`relative ${isMobile ? 'w-[60px] h-[60px]' : 'w-[100px] h-[100px]'}`}>
              <Image
                src="/7.png"
                alt="Bliss Stitches Logo"
                fill
                style={{ objectFit: 'contain' }}
                className="mr-2"
              />
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.toLowerCase())
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="px-4 py-2">
              {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item} className="py-2">
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.toLowerCase())
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center">
        <Image
          src="/1.jpeg"
          alt="Bliss Stitches Tailoring"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Bespoke Tailoring Excellence</h1>
          <p className="text-xl md:text-2xl mb-10 font-light">Crafting Perfection, One Stitch at a Time</p>
          <Link 
            href="https://wa.me/2348147662294?text=I'd%20like%20to%20book%20an%20appointment%20for%20tailoring"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-300">
              Book an Appointment 
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">The Art of Bespoke Tailoring</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Bliss Stitches, we blend time-honored Nigerian craftsmanship with modern elegance. 
                Our master tailors bring decades of experience to every garment, ensuring a perfect fit 
                and unparalleled style for our discerning clientele.
              </p>
              <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white transition-colors duration-300">
                Discover Our Story
              </Button>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/2.jpeg"
                alt="Tailor at work"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">Our Bespoke Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Scissors, title: "Classy Modern Styles", description: "Tailored to perfection for your unique style." },
              { icon: Shirt, title: "Traditional Attire", description: "Elegant Nigerian designs with a modern twist." },
              { icon: Ruler, title: "Alterations", description: "Expert adjustments for the perfect fit." }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <service.icon className="w-16 h-16 mx-auto mb-6 text-amber-600" />
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">What Our Clients Say</h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <blockquote className="text-2xl italic mb-8 leading-relaxed">
            &ldquo; Bliss Stitches has redefined luxury tailoring for me. Their attention to detail and commitment to perfection is unmatched.&ldquo;
            </blockquote>
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} className="w-8 h-8 text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-xl font-semibold">Favour John, Lagos</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">Our Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-amber-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-white">Experience Bespoke Excellence</h2>
            <p className="text-2xl mb-10 text-white max-w-3xl mx-auto">Book your consultation today and step into a world of tailored perfection.</p>
            <Link 
              href="https://wa.me/2348147662294?text=I'd%20like%20to%20schedule%20a%20fitting%20for%20tailoring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-amber-600 text-amber-600 hover:bg-amber-700 transition-colors duration-300">
                Schedule Your Fitting
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Bliss Stitches</h3>
              <p className="text-gray-400">Crafting elegance since 2010</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <p className="text-gray-400 mb-2">Abuja, Nigeria</p>
              <Link 
                href="https://wa.me/2348147662294" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Phone: +234 814 766 2294
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-6">
                {['Whatsapp',].map((social) => (
                  <Link key={social} 
                href="https://wa.me/2348147662294" className="text-gray-400 hover:text-white transition-colors duration-200">{social}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Bliss Stitches. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}