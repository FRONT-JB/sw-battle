import { CreatorInfo, PostContent } from '../model/boards.model';

export class CreateBoardDto {
  id?: string;
  creator: CreatorInfo;
  content: PostContent;
}
