package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

    def getAllProducts: Action[AnyContent] = Action {
        Ok("List of all products")
    }

    def getProductById(id: Long): Action[AnyContent] = Action {
        Ok(s"Product with ID $id")
    }

    def createProduct: Action[JsValue] = Action(parse.json) { request =>
        Ok("Product created")
    }

    def updateProduct(id: Long): Action[JsValue] = Action(parse.json) { request =>
        Ok(s"Product with ID $id updated")
    }

    def deleteProduct(id: Long): Action[AnyContent] = Action {
        Ok(s"Product with ID $id deleted")

    }
}
