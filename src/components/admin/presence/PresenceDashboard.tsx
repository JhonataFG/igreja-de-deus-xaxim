
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePresenceEvents } from "@/hooks/presence/use-presence-events";
import { useMembers } from "@/hooks/presence/use-members";
import { Progress } from "@/components/ui/progress";
import { UsersRound, UserCheck, UserMinus, UserPlus } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const PresenceDashboard = () => {
  const { eventsSummary, isSummaryLoading } = usePresenceEvents();
  const { members, isLoading: isMembersLoading } = useMembers();

  const activeMembers = members.filter((member) => member.status === "active");
  const inactiveMembers = members.filter((member) => member.status === "inactive");
  const activeMembersPercentage = members.length
    ? Math.round((activeMembers.length / members.length) * 100)
    : 0;

  if (isSummaryLoading || isMembersLoading) {
    return <div className="py-8 text-center">Carregando estatísticas...</div>;
  }

  const formatDate = (dateString: string) => {
    try {
      // Try to parse as ISO date first
      return format(parseISO(dateString), "dd 'de' MMMM", { locale: ptBR });
    } catch (error) {
      // If parsing fails, try to parse as yyyy-MM-dd
      try {
        const [year, month, day] = dateString.split("-").map(Number);
        return format(new Date(year, month - 1, day), "dd 'de' MMMM", { locale: ptBR });
      } catch (error) {
        return dateString;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
            <UsersRound className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeMembers.length} ativos, {inactiveMembers.length} inativos
            </p>
            <div className="mt-3">
              <Progress value={activeMembersPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {activeMembersPercentage}% de membros ativos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
            <UserCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Membros com status "ativo" no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Membros Inativos</CardTitle>
            <UserMinus className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Membros com status "inativo" no sistema
            </p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-medium mt-6">Últimos Eventos</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {eventsSummary.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="pt-6 text-center text-muted-foreground">
              Nenhum evento com registro de presença encontrado.
            </CardContent>
          </Card>
        ) : (
          eventsSummary.map((summary) => (
            <Card key={summary.eventId}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{summary.eventTitle}</CardTitle>
                <CardDescription>{formatDate(summary.date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Presença</span>
                  <span className="text-sm font-medium">
                    {summary.presentMembers}/{summary.totalMembers}
                  </span>
                </div>
                <Progress value={summary.attendancePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {summary.attendancePercentage}% de presença
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PresenceDashboard;
