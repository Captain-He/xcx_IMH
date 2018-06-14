<?php
namespace Home\Model;

use Think\Model\ViewModel;
class MessageViewModel extends ViewModel
{
	public $viewFields = array(
		'Message'  => array('message_id' , 'content','pic_url' ,
			'created_tm','clock_tm','light','user_id','message_name','box_num','take','mark')
		);
}