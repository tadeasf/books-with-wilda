import { Heart, Users, BookMarked } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function About() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">About Books with Ztracena Cackorka</h1>
          <p className="text-muted-foreground">
            A platform for book lovers to share, discover, and track their reading journey.
          </p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <p className="text-sm text-muted-foreground">Connecting readers around the world</p>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Books with ZTRACENA CACORKA was created with a simple mission: to connect readers 
              around the world and foster a community where the love of reading is 
              celebrated. We believe that books have the power to transform lives, 
              spark imagination, and build bridges between different cultures and 
              perspectives.
            </p>
            <p>
              Our platform is designed to make it easy for you to keep track of your 
              reading journey, discover new books that match your interests, and 
              connect with fellow book enthusiasts.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Track Your Reading</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep a digital library of books you&apos;ve read, want to read, and are 
                currently reading.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Share Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Help others discover great books by sharing your favorites and writing 
                thoughtful reviews.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle>Connect with Readers</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join reading challenges, participate in discussions, and follow other 
                readers with similar tastes.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Who is Ztracena Cacorka?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              ZTRACENA CACORKA is our not so fictional mascot - an avid reader with an insatiable 
              appetite for books of all genres. She represents the curious reader 
              in all of us, always searching for the next great story to get lost in.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I join the community?</AccordionTrigger>
                <AccordionContent>
                  Simply create an account using the login button in the navigation bar. 
                  Once registered, you can start tracking books, joining discussions, and connecting with other readers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                <AccordionContent>
                  Currently, we offer a responsive web experience that works on all devices. 
                  A dedicated mobile app is in our development roadmap for the future.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I contribute to the platform?</AccordionTrigger>
                <AccordionContent>
                  The best way to contribute is by actively participating in discussions, 
                  writing thoughtful book reviews, and sharing your reading lists with the community.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}