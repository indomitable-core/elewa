import { Platforms } from "@app/model/convs-mgr/conversations/admin/system";
import { BaseMessage } from "@app/model/convs-mgr/conversations/messages";
import { MetaMessagingProducts, RecepientType, WhatsAppBaseMessage, WhatsAppMessageType } from "@app/model/convs-mgr/functions";
import { HandlerTools } from "@iote/cqrs";
import { FunctionHandler, HttpsContext } from "@ngfi/functions";
import { SendMessageFactory } from "../factory/send-message.factory";
import { SendWhatsAppMessageModel } from "../models/whatsapp/whatsapp-send-message.model";

import { Block } from '@app/model/convs-mgr/conversations/chats';

/**
 * @Description Used to send message to the desired provider
 */
export class SendMessageHandler extends FunctionHandler< {msg: BaseMessage, block: Block}, void>{
  
  public async execute(data: {msg: BaseMessage, block: Block}, context:HttpsContext, tools:HandlerTools)
  {
    tools.Logger.log(() =>`[SendWhatsAppMessageHandler] Started execution`)

    const env = context.environment;
    const client = new SendMessageFactory(data.msg.platform, tools).resolvePlatform()

    return client.sendMessage(data.msg, data.block.type,  env)
  }
}