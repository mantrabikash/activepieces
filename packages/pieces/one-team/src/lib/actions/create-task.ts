import {createAction, OAuth2PropertyValue, Property} from "@activepieces/pieces-framework";
import {AuthenticationType, httpClient, HttpMethod} from "@activepieces/pieces-common";
import {oneTeamCommon} from "../common/common";
import {oneTeamAuth} from "../../index";

export const createTask = createAction({
    name: 'create_task', // Must be a unique across the piece, this shouldn't be changed.
    auth: oneTeamAuth,
    displayName: 'Create Task',
    description: 'Create task on 1team',
    props: {
        workspace_id: oneTeamCommon.workspace_id,
        summary: Property.ShortText({
            displayName: 'Task summary',
            description: undefined,
            required: true,
        }),
    },
    async run(context) {
        const savedParams = context.propsValue['workspace_id'];
        const authProp: OAuth2PropertyValue = context.auth as OAuth2PropertyValue;
        const createTaskResponse = await httpClient.sendRequest<string[]>({
            method: HttpMethod.POST,
            url: `${oneTeamCommon.baseUrl}/wot/assignment/adhoc`,
            body: {
                "_id": null,
                "name": context.propsValue['summary'],
                "description": "",
                "thingId": "64f76cec46a8cedbee02184c",
                "performer": "64f76ceb1ed276af6a0074d0",
                "performers": [],
                "dueDateTime": {"year": 2023, "month": 9, "day": 14},
                "properties": {
                    "type": "general",
                    "contentType": "general",
                    "creationSource": "user",
                    "allowDelay": true,
                    "tentativeTimeToClose": 0,
                    "tentativeStartTime": 1694559600000,
                    "tentativeStartDateTimestamp": {"hour": 10, "minute": 20},
                    "timeLogMandatory": false,
                    "moveDueDate": false,
                    "helpURL": ""
                },
                "priority": {
                    "key": "p_002",
                    "value": "Medium",
                    "description": "Medium",
                    "status": "active",
                    "priorityLevel": 3,
                    "displayOrder": 2
                },
                "resources": [],
                "timeModel": {"hour": 23, "minute": 59},
                "tags": {"searchTags": []},
                "duration": 1,
                "owner": "64f76ceb1ed276af6a0074d0",
                "dueTime": 1694732340371,
                "startTime": 1694596835372
            },
            headers: {
                'Wot-Workspace-Id': savedParams.workspaceId,
                'Wot-User-Id': savedParams.wotUserId,
                'Userid': savedParams.userId,
                'Organizationid': savedParams.organisationId,
                'Iamuserid': savedParams.iamUserId,
                'Clientid': '634e809a1ac94f41fc07a832',
                'Apikey': 'b2w16qhe0p',
            },
            authentication: {
                type: AuthenticationType.BEARER_TOKEN,
                token: authProp['access_token'],
            },
        });
        return createTaskResponse.body;
    },
});
