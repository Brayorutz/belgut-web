import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useCreateInquiry();
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We will get back to you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />

      <div className="bg-gray-900 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="font-display font-bold text-4xl mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Have questions? We'd love to hear from you. Reach out to our team.</p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-6">Our Locations</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" /> Main Campus
                  </h4>
                  <p className="text-gray-600 text-sm">Off Kericho-Litein Road, Kericho</p>
                  <p className="text-gray-600 text-sm mt-1">Tel: +254 700 123 456</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" /> Litein Campus
                  </h4>
                  <p className="text-gray-600 text-sm">Litein Town</p>
                  <p className="text-gray-600 text-sm mt-1">Tel: +254 722 000 000</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" /> Sosiot Campus
                  </h4>
                  <p className="text-gray-600 text-sm">Sosiot Center</p>
                  <p className="text-gray-600 text-sm mt-1">Tel: +254 711 000 000</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" /> Masarian Campus
                  </h4>
                  <p className="text-gray-600 text-sm">Masarian Area</p>
                  <p className="text-gray-600 text-sm mt-1">Tel: +254 733 000 000</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">General Inquiries</h4>
                  <p className="text-gray-600 text-sm">Email: info@btti.ac.ke</p>
                  <p className="text-gray-600 text-sm mt-1">Staff Portal: <a href="https://betti.mycampuscura.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">betti.mycampuscura.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-2xl mb-6 text-gray-900">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-gray-50 border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Inquiry about..." {...field} value={field.value || ""} className="bg-gray-50 border-gray-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-gray-50 border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 min-w-[200px]" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="h-96 w-full bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.764560729784!2d35.2678!3d-0.3678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjInMDQuMSJTIDM1wrAxNicwNC4xIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
        />
      </div>

      <Footer />
    </div>
  );
}
