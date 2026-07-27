import DashboardHome from './DashboardHome';
import PendingDocumentsQueue from '../../components/dashboard/PendingDocumentsQueue';
import OffersManager from '../../components/dashboard/OffersManager';

const ManagementDashboard = () => (
  <div className="space-y-6">
    <DashboardHome />
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <PendingDocumentsQueue />
      <OffersManager />
    </div>
  </div>
);

export default ManagementDashboard;
