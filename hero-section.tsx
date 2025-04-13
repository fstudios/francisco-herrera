"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useState, type FormEvent } from "react"

export default function HeroSection() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("Form submission started")

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setSubmitStatus("error")
      setErrorMessage("Please fill in all required fields.")
      console.log("Form validation failed: missing required fields")
      return
    }

    // Reset states
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Force reset any scrolling flags that might be set in other components
    // This ensures the form submission isn't blocked by scrolling logic
    if (window && window.document) {
      const scrollingElements = window.document.querySelectorAll('[data-scrolling="true"]')
      scrollingElements.forEach(el => {
        el.setAttribute('data-scrolling', 'false')
      })
      console.log("🔄 Reset any scrolling flags to ensure form submission works")
    }

    try {
      // UPDATED GOOGLE APPS SCRIPT URL - DO NOT CHANGE
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxR9fw8zObPBC5f0hVISzlkzqQlpsB7UwRDUX2L0zB-4ip45537c79Fo9MFb3rRUhAzpw/exec"

      console.log("⭐ FORM SUBMISSION ATTEMPT - DATA:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "",
        message: formData.message || ""
      })

      console.log("⭐ Using FINAL SIMPLIFIED Google Script URL:", scriptUrl)

      // SUPER SIMPLE APPROACH: Just render an actual form and submit it
      // This is the most compatible approach that works across all browsers

      // First set UI to submitting state to give feedback
      setIsSubmitting(true)

      // Short delay to ensure the UI updates before we proceed
      setTimeout(() => {
        console.log("📝 Creating temporary form in the DOM")

        // Create a visible form - this is crucial for maximum compatibility
        const tempFormContainer = document.createElement('div')
        tempFormContainer.style.position = 'fixed'
        tempFormContainer.style.top = '0'
        tempFormContainer.style.left = '0'
        tempFormContainer.style.width = '100%'
        tempFormContainer.style.height = '100%'
        tempFormContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        tempFormContainer.style.zIndex = '9999'
        tempFormContainer.style.display = 'flex'
        tempFormContainer.style.alignItems = 'center'
        tempFormContainer.style.justifyContent = 'center'

        // Add a message
        const messageDiv = document.createElement('div')
        messageDiv.style.backgroundColor = 'white'
        messageDiv.style.color = 'black'
        messageDiv.style.padding = '20px'
        messageDiv.style.borderRadius = '10px'
        messageDiv.style.maxWidth = '400px'
        messageDiv.style.textAlign = 'center'
        messageDiv.innerHTML = `
          <h3 style="margin-bottom: 10px; font-weight: bold; font-size: 18px;">Submitting Your Reservation</h3>
          <p style="margin-bottom: 15px;">Please wait while we process your information...</p>
          <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #ccc; border-top-color: #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <style>
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        `
        tempFormContainer.appendChild(messageDiv)

        // Create the form element - UPDATED: Use iframe to prevent tab opening
        const hiddenIframe = document.createElement('iframe')
        hiddenIframe.name = 'hidden-form-target'
        hiddenIframe.style.display = 'none'
        tempFormContainer.appendChild(hiddenIframe)

        const form = document.createElement('form')
        form.method = 'GET'
        form.action = scriptUrl
        form.target = 'hidden-form-target' // Target the hidden iframe instead of _blank
        form.id = 'direct-submission-form'
        form.setAttribute('data-form-type', 'submission')
        form.style.display = 'none'

        // Add form fields
        const fields = [
          { name: 'firstName', value: formData.firstName },
          { name: 'lastName', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone || '' },
          { name: 'message', value: formData.message || '' }
        ]

        fields.forEach(field => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = field.name
          input.value = field.value
          form.appendChild(input)
        })

        // Add the form to the container
        tempFormContainer.appendChild(form)

        // Add the container to the body
        document.body.appendChild(tempFormContainer)

        console.log("🚀 Submitting form with hidden iframe approach")

        // Submit the form - with extra logging and error handling
        console.log("🚀 FORM SUBMISSION INITIATED")
        try {
          form.submit()
          console.log("✅ Form.submit() called successfully")
        } catch (submitError) {
          console.error("❌ Error during form.submit():", submitError)

          // Fallback to fetch API if form submission fails
          try {
            const queryParams = fields.map(f => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`).join('&')
            const fullUrl = `${scriptUrl}?${queryParams}`
            console.log("⚠️ Falling back to fetch API:", fullUrl)

            fetch(fullUrl, { method: 'GET', mode: 'no-cors' })
              .then(() => console.log("✅ Fetch fallback successful"))
              .catch(fetchError => console.error("❌ Fetch fallback failed:", fetchError))
          } catch (fetchError) {
            console.error("❌ Fetch API fallback failed:", fetchError)
          }
        }

        // Set a timeout to remove the container after submission
        setTimeout(() => {
          console.log("✅ Removing temporary form container")
          document.body.removeChild(tempFormContainer)

          // Update UI to success state
          console.log("⭐ Setting submission status to success")
          setSubmitStatus("success")

          // Clear the form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: ""
          })

          // Release the submitting state
          setIsSubmitting(false)

          console.log("%c ✅ FORM SUBMITTED SUCCESSFULLY ✅ ", "background: green; color: white; font-size: 16px; padding: 5px;")
        }, 4000) // Give it 4 seconds to complete the submission
      }, 500) // Small delay to ensure the UI updates

    } catch (error) {
      console.error("❌ ERROR SUBMITTING FORM:", error)
      setSubmitStatus("error")
      setErrorMessage("There was a problem submitting your reservation. Please try again or contact us directly.")
      setIsSubmitting(false)
    }
  }

  // Add a function to manually trigger the success state for testing
  const testSuccessMessage = () => {
    setSubmitStatus("success")
    console.log("Testing success message display")
  }

  // UPDATED: Alternative submission method as a last resort
  const submitWithFormElement = () => {
    console.log("Using DIRECT FORM SUBMISSION method with hidden iframe")

    // First, show a loading overlay
    const loadingOverlay = document.createElement('div')
    loadingOverlay.style.position = 'fixed'
    loadingOverlay.style.top = '0'
    loadingOverlay.style.left = '0'
    loadingOverlay.style.width = '100%'
    loadingOverlay.style.height = '100%'
    loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    loadingOverlay.style.zIndex = '9999'
    loadingOverlay.style.display = 'flex'
    loadingOverlay.style.alignItems = 'center'
    loadingOverlay.style.justifyContent = 'center'

    const loadingMessage = document.createElement('div')
    loadingMessage.style.backgroundColor = 'white'
    loadingMessage.style.padding = '20px'
    loadingMessage.style.borderRadius = '10px'
    loadingMessage.style.textAlign = 'center'
    loadingMessage.innerHTML = `
      <h3 style="margin-bottom: 10px; font-weight: bold;">Processing Your Reservation</h3>
      <p>Please wait while we submit your information...</p>
      <div style="margin-top: 15px; display: inline-block; width: 30px; height: 30px; border: 3px solid #ccc; border-top-color: #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `

    loadingOverlay.appendChild(loadingMessage)
    document.body.appendChild(loadingOverlay)

    // Set UI state
    setIsSubmitting(true)

    // Create hidden iframe for the form target
    const hiddenIframe = document.createElement('iframe')
    hiddenIframe.name = 'hidden-alt-form-target'
    hiddenIframe.style.display = 'none'
    document.body.appendChild(hiddenIframe)

    // Create form element
    const form = document.createElement('form')
    form.method = 'GET'
    form.action = "https://script.google.com/macros/s/AKfycbxR9fw8zObPBC5f0hVISzlkzqQlpsB7UwRDUX2L0zB-4ip45537c79Fo9MFb3rRUhAzpw/exec"
    form.id = 'alternative-submission-form'
    form.setAttribute('data-form-type', 'alternative-submission')
    form.target = 'hidden-alt-form-target' // Target the hidden iframe

    // Add inputs
    const fields = [
      { name: 'firstName', value: formData.firstName },
      { name: 'lastName', value: formData.lastName },
      { name: 'email', value: formData.email },
      { name: 'phone', value: formData.phone || '' },
      { name: 'message', value: formData.message || '' }
    ]

    fields.forEach(field => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = field.name
      input.value = field.value
      form.appendChild(input)
    })

    // Add to body
    document.body.appendChild(form)

    console.log("🚀 Submitting alternative form using hidden iframe")

    // Try to submit the form
    try {
      form.submit()
      console.log("✅ Alternative form.submit() called successfully")

      // Set a timeout to remove the loading overlay and update UI
      setTimeout(() => {
        document.body.removeChild(loadingOverlay)
        if (document.body.contains(form)) {
          document.body.removeChild(form)
        }
        if (document.body.contains(hiddenIframe)) {
          document.body.removeChild(hiddenIframe)
        }

        // Update UI
        setIsSubmitting(false)
        setSubmitStatus("success")

        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        })

        console.log("✅ ALTERNATIVE FORM SUBMITTED SUCCESSFULLY")
      }, 3000)

    } catch (submitError) {
      console.error("❌ Error during alternative form.submit():", submitError)

      // Fallback to fetch API
      try {
        const queryParams = fields.map(f => `${encodeURIComponent(f.name)}=${encodeURIComponent(f.value)}`).join('&')
        const fullUrl = `${form.action}?${queryParams}`
        console.log("⚠️ Falling back to fetch API:", fullUrl)

        fetch(fullUrl, { method: 'GET', mode: 'no-cors' })
          .then(() => {
            console.log("✅ Fetch fallback successful")

            // Clean up and show success
            document.body.removeChild(loadingOverlay)
            if (document.body.contains(form)) document.body.removeChild(form)
            if (document.body.contains(hiddenIframe)) document.body.removeChild(hiddenIframe)

            setIsSubmitting(false)
            setSubmitStatus("success")

            // Clear form
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: ""
            })
          })
          .catch(fetchError => {
            console.error("❌ Fetch fallback failed:", fetchError)
            document.body.removeChild(loadingOverlay)
            setIsSubmitting(false)
            setSubmitStatus("error")
            setErrorMessage("Unable to submit form. Please try again later or contact us directly.")
          })
      } catch (fetchError) {
        console.error("❌ All submission methods failed:", fetchError)
        document.body.removeChild(loadingOverlay)
        setIsSubmitting(false)
        setSubmitStatus("error")
        setErrorMessage("Unable to submit form. Please try again later or contact us directly.")
      }
    }
  }

  return (
    <div id="reserve-tickets" className="relative w-full bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 overflow-y-auto flex flex-col min-h-screen">
      {/* Title for the Hero Section */}
      <div className="sticky top-0 pt-4 sm:pt-12 md:pt-16 pb-2 sm:pb-10 md:pb-12 z-50 bg-gradient-to-b from-purple-900/80 to-transparent">
        <div className="container mx-auto text-center px-4">
          <div className="inline-block relative mb-1 sm:mb-2">
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl absolute -left-4 sm:-left-6 md:-left-8 top-1/2 transform -translate-y-1/2">•</span>
            <h2 className="text-xl sm:text-3xl md:text-6xl font-bold text-white tracking-wide uppercase">La Música Une</h2>
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl absolute -right-4 sm:-right-6 md:-right-8 top-1/2 transform -translate-y-1/2">•</span>
          </div>
          <div className="h-1 bg-red-500 w-16 sm:w-24 md:w-48 mx-auto mt-1 sm:mt-3 md:mt-4 mb-1 sm:mb-2"></div>
          <p className="text-white/80 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">
            Join us for an unforgettable celebration of music and cultural heritage
          </p>
        </div>
      </div>

      {/* Main Content - MOBILE-FIRST DESIGN */}
      <div className="flex-grow container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Card with simple styling that works reliably on mobile */}
        <div className="bg-black/80 rounded-lg border border-white/10 shadow-lg mx-auto max-w-[95%] sm:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] overflow-visible">
          {/* Success message */}
          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-2 sm:p-4 rounded-md text-center text-sm sm:text-base md:text-lg m-3 sm:m-6">
              <p className="font-bold">Thank you! Your reservation has been submitted successfully.</p>
            </div>
          )}

          {/* Responsive grid for image and form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-6 md:p-8">
            {/* Image Section */}
            <div className="bg-black/70 p-3 sm:p-5 border border-white/20 rounded-lg">
              <div className="aspect-[16/9] relative overflow-hidden mb-2 sm:mb-4 rounded">
                <Image
                  src="/images/francisco-concert-poster.png"
                  alt="Francisco Herrera in Concert"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center">
                <h3 className="text-white text-base sm:text-xl font-bold mb-1 md:mb-2">
                  Special Performance
                </h3>
                <p className="text-white/80 text-xs sm:text-base">
                  Join us for an unforgettable night of music celebrating our shared cultural heritage.
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-2 rounded-md text-center text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Form notice */}
                <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-2 rounded-md text-xs text-center">
                  <p>When you submit this form, you'll see a brief processing screen. A new tab may open to process your reservation.</p>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">FIRST NAME / NOMBRE *</p>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Nombre"
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">LAST NAME / APELLIDO *</p>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Apellido"
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">EMAIL / CORREO *</p>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Correo elect"
                      required
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-gray-400">PHONE / TELÉFONO</p>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Número"
                      className="bg-white/10 border border-white/30 rounded-md text-white h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <p className="text-xs uppercase text-gray-400">MESSAGE / MENSAJE</p>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    className="bg-white/10 border border-white/30 rounded-md text-white min-h-[60px] resize-none text-sm"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 text-white hover:bg-red-600 rounded-lg h-10 font-bold disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      PROCESSING...
                    </span>
                  ) : (
                    "RESERVE TICKETS / RESERVAR BOLETOS"
                  )}
                </Button>

                {/* Alternative submission method */}
                <div className="text-center mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!formData.firstName || !formData.lastName || !formData.email) {
                        setSubmitStatus("error")
                        setErrorMessage("Please fill in all required fields first.")
                        return
                      }
                      submitWithFormElement()
                    }}
                    className="text-blue-300 hover:text-blue-400 text-xs underline"
                  >
                    If submission doesn't work, click here to try direct page redirect method
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  * Required fields / Campos obligatorios
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Text - Desktop only */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none hidden sm:flex">
        <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-marquee">
          CONCERT • FRANCISCO • CONCERT • FRANCISCO •
        </h1>
      </div>

      {/* Styles - SIMPLIFIED FOR MOBILE WITHOUT WHITESPACE */}
      <style jsx global>{`
        /* Simplified styles that work reliably on mobile */
        html, body {
          overflow-x: hidden;
          position: relative;
          min-height: 100%;
          background-color: black; /* Prevent white background showing */
          margin: 0;
          padding: 0;
        }
        
        /* Prevent zoom on iOS */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          select, textarea, input {
            font-size: 16px !important;
          }
        }
        
        /* Prevent overscroll behavior */
        html, body {
          overscroll-behavior-y: none;
        }
        
        /* Fix any possible leaks causing whitespace */
        #__next, main {
          background-color: black;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animation for success message */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Background text animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* Mobile optimization */
        @media (max-width: 640px) {
          #reserve-tickets {
            min-height: 100vh !important;
          }
          
          /* Ensure input fields are tall enough for touch */
          input, textarea, button {
            min-height: 42px !important;
          }
        }
      `}</style>
    </div>
  )
}
