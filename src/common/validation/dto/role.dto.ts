import { isBoolean, IsBoolean, IsOptional, IsString} from "class-validator";
import { BaseDto } from "../base.dto";
import { DtoGroup } from "../dtoGroups";


export class RoleDto extends BaseDto{
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    name: string;

    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsString({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    description: string;

    @IsBoolean({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    @IsOptional({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    employee: boolean;

    @IsBoolean({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    @IsOptional({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    employeeCreate: boolean;

    @IsBoolean({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    @IsOptional({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    employeeUpdate: boolean;

    @IsBoolean({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    @IsOptional({groups: [DtoGroup.CREATE, DtoGroup.UPDATE]})
    employeeDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    role: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    roleCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    roleUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    roleDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    subject: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    subjectCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    subjectUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    subjectDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    test: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    testCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    testUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    testDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    news: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    newsCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    newsUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    newsDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    class: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    classCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    classUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    classDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    chapter: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    chapterCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    chapterUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    chapterDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    topic: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    topicCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    topicUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    topicDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    question: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    questionCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    questionUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    questionDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    answer: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    answerCreate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    answerUpdate: boolean;

    @IsBoolean({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    @IsOptional({ groups: [DtoGroup.CREATE, DtoGroup.UPDATE] })
    answerDelete: boolean;

    @IsBoolean({ groups: [DtoGroup.GET, DtoGroup.GET_BY_ID] })
    testResults: boolean;
}