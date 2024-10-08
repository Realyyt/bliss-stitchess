'use client'

import Image from 'next/image'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { ChevronRight, Star, Scissors, Shirt, Ruler } from 'lucide-react'
import ClientSideComponent from './ClientSideComponent'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'three'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const creationsRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentSlide2, setCurrentSlide2] = useState(0)

  const carouselImages = [
    '/tailored-suit-1.jpg',
    '/tailored-dress-1.jpg',
    '/tailored-shirt-1.jpg',
  ]

  const carouselImages2 = [
    '/tailored-suit-2.jpg',
    '/tailored-dress-2.jpg',
    '/tailored-shirt-2.jpg',
  ]

  useEffect(() => {
    if (typeof window !== 'undefined' && creationsRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      creationsRef.current.appendChild(renderer.domElement)

      const textureLoader = new TextureLoader()
      const textures = [
        '/tailored-suit-1.jpg',
        '/tailored-dress-1.jpg',
        '/tailored-shirt-1.jpg',
        '/tailored-suit-2.jpg',
        '/tailored-dress-2.jpg',
        '/tailored-shirt-2.jpg',
      ].map(path => textureLoader.load(path))

      const radius = 5
      const imageGroup = new THREE.Group()
      textures.forEach((texture, index) => {
        const angle = (index / textures.length) * Math.PI * 2
        const geometry = new THREE.PlaneGeometry(3, 4)
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

      camera.position.z = 10

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
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        creationsRef.current?.removeChild(renderer.domElement)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">Bliss Stitches</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ClientSideComponent />
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center">
        <Image
          src="/hero-image.jpg"
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
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-300">
            Book an Appointment <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
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
                src="/tailor-at-work.jpg"
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
              { icon: Scissors, title: "Custom Suits", description: "Tailored to perfection for your unique style." },
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
              "Bliss Stitches has redefined luxury tailoring for me. Their attention to detail and commitment to perfection is unmatched."
            </blockquote>
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} className="w-8 h-8 text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-xl font-semibold">John Doe, Lagos</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">Our Creations</h2>
          <div ref={creationsRef} className="w-full h-[600px] mb-16"></div>
          
          {/* New Carousels */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-center">Formal Wear</h3>
              <div className="relative h-80 overflow-hidden rounded-lg">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentSlide}
                    src={carouselImages[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                >
                  &#10094;
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-center">Casual Wear</h3>
              <div className="relative h-80 overflow-hidden rounded-lg">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentSlide2}
                    src={carouselImages2[currentSlide2]}
                    alt={`Slide ${currentSlide2 + 1}`}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  onClick={() => setCurrentSlide2((prev) => (prev - 1 + carouselImages2.length) % carouselImages2.length)}
                >
                  &#10094;
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  onClick={() => setCurrentSlide2((prev) => (prev + 1) % carouselImages2.length)}
                >
                  &#10095;
                </button>
              </div>
            </div>
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
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 transition-colors duration-300">
              Schedule Your Fitting
            </Button>
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
              <p className="text-gray-400 mb-2">123 Fashion Street, Lagos, Nigeria</p>
              <p className="text-gray-400 mb-2">Phone: +234 123 456 7890</p>
              <p className="text-gray-400">Email: info@blissstitches.com</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-6">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{social}</a>
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