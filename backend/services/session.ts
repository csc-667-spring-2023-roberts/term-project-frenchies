import session from 'express-session';
import ConnectPg from 'connect-pg-simple';

const PostgresSession = ConnectPg(session);

export default PostgresSession;