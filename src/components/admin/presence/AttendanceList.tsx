
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberWithAttendance } from "@/types/presence";
import { UserRound } from "lucide-react";

interface AttendanceListProps {
  members: MemberWithAttendance[];
  onToggleAttendance: (memberId: string, attended: boolean) => void;
  isEditable?: boolean;
}

const AttendanceList = ({ members, onToggleAttendance, isEditable = true }: AttendanceListProps) => {
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "50px" }}>Presente</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  {searchTerm || filter !== "all"
                    ? "Nenhum membro encontrado com os filtros atuais"
                    : "Nenhum membro cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox
                      checked={member.attendance?.attended || false}
                      onCheckedChange={(checked) => {
                        if (isEditable) {
                          onToggleAttendance(member.id, checked === true);
                        }
                      }}
                      disabled={!isEditable}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.phone || "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Total: {filteredMembers.length} membros ativos
        {filter === "all" && (
          <span>
            {" "}
            (
            {
              filteredMembers.filter((m) => m.attendance?.attended).length
            }{" "}
            presentes)
          </span>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;
