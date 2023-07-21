<?php

require './mail/PHPMailerAutoload.php';

if(isset($_POST['message'])) {

    $mail = new PHPMailer;
    $mail->SMTPDebug = 1;
    $mail->isSMTP();                                    // Set mailer to use SMTP
    $mail->Host = 'ssl0.ovh.net';                       // Specify main and backup server
    $mail->SMTPAuth = true;                             // Enable SMTP authentication
    $mail->Username = 'hola@asteriscoedita.com';        // SMTP username
    $mail->Password = ${password};                   // SMTP password
    $mail->SMTPSecure = 'ssl';                          // Enable encryption, 'ssl' also accepted
    $mail->Port = 465;

    $email_to = "hola@asteriscoedita.com";
    $email_subject = $_POST['email'];

    function died($error) {
        echo $error;
        header('HTTP/1.1 500 Internal Server Error');
        die();
    }

    // validation expected data exists

    if(!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['message'])) {

        died('Parece que has tenido algún problema al rellenar nuestro formulario');
    }

    $name = $_POST['name'];         // required
    $message = $_POST['message'];   // required

    $error_message = "";

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_subject)) {
    $error_message .= 'El email que nos has indicado parece no ser válido';
  }

  $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$name)) {
    $error_message .= 'El nombre que nos has indicado parece no ser válido';
  }

  if(strlen($message) < 2) {
    $error_message .= '¿Eso es todo?';
  }

  if(strlen($error_message) > 0) {
    died($error_message);
  }

    $email_message = "Detalles del formulario de contacto.\n\n";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Nombre de contacto: ".clean_string($name)."\n";
    $email_message .= "Email de contacto: ".clean_string($email_subject)."\n";
    $email_message .= "Mensaje: ".clean_string($message)."\n";

    $email_from = "formulario_contacto@asteriscoedita.com";

    $mail->setFrom($email_from);                //Set who the message is to be sent from
    $mail->addAddress($email_to);               // Add a recipient
    //$mail->isHTML(true);                      // Set email format to HTML

    $mail->Subject = $email_subject;
    $mail->Body    = $email_message;

$headers = 'From: '.$email_from."\r\n".'Reply-To: '.$email_from."\r\n" .'X-Mailer: PHP/' . phpversion();
if(!$mail->send()){
  header('HTTP/1.1 500 Internal Server Error');
  die();
}
?>

<?php
}
?>
