"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PrintButton = () => {
    return (
        <Button
            onClick={() => window.print()}
            className="rounded-full bg-white text-slate-900 border-2 border-slate-100 hover:bg-slate-50 font-black text-xs uppercase tracking-widest px-6"
        >
            <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
    );
};
