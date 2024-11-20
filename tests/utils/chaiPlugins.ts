import { use } from 'chai';
import uuid from 'chai-uuid';
import sinonChai from 'sinon-chai';
import chaiSubset from 'chai-subset';
import chaiAsPromised from 'chai-as-promised';
import chaiDateTime from 'chai-datetime';

use(sinonChai);
use(chaiSubset);
use(chaiAsPromised);
use(uuid);
use(chaiDateTime);
