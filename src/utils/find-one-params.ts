import { IsString } from 'class-validator';

class FindOneParams {
  @IsString()
  id: string;
}

export default FindOneParams;
