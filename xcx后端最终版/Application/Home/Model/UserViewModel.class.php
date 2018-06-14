<?php
namespace Home\Model;

use Think\Model\ViewModel;
class UserViewModel extends ViewModel
{
	public $viewFields = array(
		'User'  => array('user_id' , 'nickname' ,'created_tm','call_name','call_num')
		);
}