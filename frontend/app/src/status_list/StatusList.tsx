import { Status } from "../models/Status";
import StatusDetails from "../status_details/StatusDetails";
import styles from './StatusList.module.css';

interface StatusListProps {
    statuses: Status[];
}

const StatusList = (props: StatusListProps): JSX.Element => {
    const { statuses } = props;
    //const { state } = useStatusContext();
    

    return (
        <div className={styles.container}>
          {statuses.map(status => (
            <div key={status._id} >
              <StatusDetails status = {status} showButtons={true}/>
            </div>
          ))}
        </div>
      );
}

export default StatusList;