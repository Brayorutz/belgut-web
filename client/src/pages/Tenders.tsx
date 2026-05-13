import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Tender, type TenderAddendum } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Calendar, AlertCircle, Paperclip, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { Navigation } from "@/components/Navigation";

export default function Tenders() {
  const { data: tenders, isLoading } = useQuery<Tender[]>({ queryKey: ["/api/tenders"] });

  const activeTenders = tenders?.filter((t) => t.status === "Open") || [];
  const closedTenders = tenders?.filter((t) => t.status === "Closed") || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Tenders & Procurement</h1>
            <p className="text-muted-foreground text-lg">
              View current and previous tender opportunities at Belgut Technical Training Institute.
            </p>
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <h2 className="text-2xl font-semibold">Current Opportunities</h2>
            </div>
            {isLoading ? (
              <div className="grid gap-4">{[1, 2].map((i) => <Card key={i} className="animate-pulse h-32" />)}</div>
            ) : activeTenders.length > 0 ? (
              <div className="grid gap-6">
                {activeTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center space-y-2">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">No active tenders at the moment.</p>
                </CardContent>
              </Card>
            )}
          </section>

          {closedTenders.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <h2 className="text-2xl font-semibold text-muted-foreground">Previous Tenders</h2>
              </div>
              <div className="grid gap-6 opacity-75">
                {closedTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function TenderCard({ tender }: { tender: Tender }) {
  const [showAddendums, setShowAddendums] = useState(false);

  const { data: addendums } = useQuery<TenderAddendum[]>({
    queryKey: ["/api/tender-addendums", tender.id],
    queryFn: async () => {
      const res = await fetch(`/api/tender-addendums?tenderId=${tender.id}`, { credentials: "include" });
      return res.json();
    },
    staleTime: Infinity,
    enabled: showAddendums,
  });

  return (
    <Card className="hover-elevate transition-all border-l-4 border-l-primary/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-xl">{tender.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Deadline: {format(new Date(tender.deadline), "MMMM dd, yyyy")}</span>
            </div>
            <Badge variant={tender.status === "Open" ? "default" : "secondary"}>{tender.status}</Badge>
          </div>
        </div>
      </CardHeader>
      {tender.description && (
        <CardContent>
          <p className="text-muted-foreground">{tender.description}</p>
        </CardContent>
      )}
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex flex-wrap gap-2">
          {tender.documentUrl && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={tender.documentUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" /> Download Tender Documents
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-primary"
            onClick={() => setShowAddendums(v => !v)}
          >
            <Paperclip className="h-4 w-4" />
            Addendums
            {showAddendums ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {showAddendums && (
          <div className="w-full border-t pt-3 space-y-2">
            {!addendums && <p className="text-sm text-muted-foreground">Loading addendums...</p>}
            {addendums?.length === 0 && <p className="text-sm text-muted-foreground italic">No addendums for this tender.</p>}
            {addendums?.map(ad => (
              <div key={ad.id} className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-amber-900">{ad.title}</p>
                  {ad.date && <p className="text-xs text-amber-700">Issued: {format(new Date(ad.date), "MMMM dd, yyyy")}</p>}
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1.5 shrink-0 border-amber-300 text-amber-800 hover:bg-amber-100">
                  <a href={ad.documentUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="h-3.5 w-3.5" /> Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
