
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, UserRound, X } from "lucide-react";
import { MemberWithAttendance } from "@/types/presence";
import { Input } from "@/components/ui/input";

interface AttendanceTabletViewProps {
  members: MemberWithAttendance[];
  onToggleAttendance: (memberId: string, attended: boolean) => void;
}

const AttendanceTabletView = ({ members, onToggleAttendance }: AttendanceTabletViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");

  const filteredMembers = members
    .filter((member) => {
      // Apply name search
      if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply attendance filter
      if (filter === "present" && (!member.attendance || !member.attendance.attended)) {
        return false;
      }
      if (filter === "absent" && member.attendance?.attended) {
        return false;
      }
      
      return true;
    })
    .filter((member) => member.status === "active");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Buscar membros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex space-x-1">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "present" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("present")}
          >
            Presentes
          </Button>
          <Button
            variant={filter === "absent" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("absent")}
          >
            Ausentes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMembers.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            {searchTerm || filter !== "all"
              ? "Nenhum membro encontrado com os filtros atuais"
              : "Nenhum membro cadastrado"}
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className={`relative flex flex-col items-center p-4 rounded-lg border transition-all ${
                member.attendance?.attended 
                  ? "bg-green-50 border-green-300" 
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <Avatar className="w-20 h-20 mb-3 border-2 border-gray-200">
                <AvatarImage src={member.photo_url || undefined} alt={member.name} />
                <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-center line-clamp-2 mb-1">{member.name}</h3>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant={member.attendance?.attended ? "default" : "outline"}
                  className={`rounded-full w-10 h-10 p-0 ${member.attendance?.attended ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={() => onToggleAttendance(member.id, true)}
                >
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  variant={member.attendance?.attended ? "outline" : "destructive"}
                  className={`rounded-full w-10 h-10 p-0 ${!member.attendance?.attended ? "bg-red-600 hover:bg-red-700" : ""}`}
                  onClick={() => onToggleAttendance(member.id, false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {member.phone && (
                <span className="text-xs text-muted-foreground mt-2">{member.phone}</span>
              )}
            </div>
          ))
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        Total: {filteredMembers.length} membros ativos
        {filter === "all" && (
          <span>
            {" "}
            ({filteredMembers.filter((m) => m.attendance?.attended).length} presentes)
          </span>
        )}
      </div>
    </div>
  );
};

export default AttendanceTabletView;
